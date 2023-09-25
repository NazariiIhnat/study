<?php
/**
 * Pagination
 * 
 * Data for selection a page of records
 */
class Pagination{
  /**
   * Number
   * @var integer
   */
  public $limit;
  /**
   * NUmber of records to skip before the page
   * @var integer
   */
  public $offset;

  public $previous;
  public $next;

  /**
   * Constructor
   * 
   * @param integer $page Page number
   * @param integer $records_per_page NUmber of records per page
   * 
   * @return void
   */
  public function __construct($page, $records_per_page, $total_records) {
    $this->limit = $records_per_page;
    $page = filter_var($page, FILTER_VALIDATE_INT, [
      'options' => [
        'default' => 1,
        'min_range' => 1
      ]
      ]);
      if($page > 1) {
        $this -> previous = $page - 1;
      }

      $total_pages = ceil($total_records / $records_per_page);

      if($page < $total_pages) {
        $this -> next = $page + 1;
      }
    $this->offset = $records_per_page * ($page - 1);
  }
}