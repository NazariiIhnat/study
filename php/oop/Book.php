<?php
require_once('Item.php');
class Book extends Item {

  public $author;

  public function overloadFunction(){
    return parent::overloadFunction() . 'world';
  }
}