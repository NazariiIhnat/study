<?php 

/**
 * Article
 * 
 * A piece of writing for publication
 */
class Article {

  public $id;
  public $title;
  public $content;
  public $published_at;
  public $errors = [];

  /**
   * Get all the articles
   * 
   * @param object $conn Connection to the database
   * 
   * @return array An associative array of all the article record
   */
  public static function getAll($conn) {
    $sql = "SELECT * FROM articles ORDER BY published_at;";
    $results = $conn->query($sql);
    return $results->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
 * Get the article record based on the ID
 *
 * @param object $conn Connection to the database
 * @param integer $id the article ID
 * @param string $columns Optional list of columns for the select, defaults to *
 *
 * @return mixed An object of this class, or null if not found
 */
public static function getByID($conn, $id, $columns = '*')
{
    $sql = "SELECT $columns
            FROM articles
            WHERE id = :id";

    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Article');

    if ($stmt->execute()) {

        return $stmt->fetch();
    }
}

/**
 * Update the article with its current propertt values
 * 
 * @param object $conn Connection to the db
 * 
 * @return boolean True if the update was successful, false otherwise
*/
public function update($conn) {
  if($this->validate()){
  $sql = "UPDATE articles SET title = :title, content = :content, published_at = :published_at WHERE id = :id";
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
  $stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
  $stmt->bindValue(':content', $this->content, PDO::PARAM_STR);

  $this->published_at == '' 
  ? $stmt->bindValue(':published_at', null, PDO::PARAM_NULL) 
  : $stmt->bindValue(':published_at', $this->published_at, PDO::PARAM_STR);

  return $stmt->execute();
  } else {
    return false;
  }
}

/**
 * Validate the properties, putting any validation error message in the $errors property
 * 
 * @return boolean True if the current properties are valid, false otherwise
 */
protected function validate()
{
    $errors = [];

    if ($this->title == '') {
        $this->errors[] = 'Title is required';
    }
    if ($this->content == '') {
        $this->errors[] = 'Content is required';
    }

    return empty($this->errors);
}

/**
 * Delete the current article
 * 
 * @param object $conn Connection to the database
 * 
 * @return boolean True if th delete was successful, false otherwise
 */
public function delete($conn) {
  $sql = "DELETE FROM articles WHERE id = :id";
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
  return $stmt->execute();
}

/**
 * Insert a new article with its current property values
 * 
 * @param object $conn Connection to the database
 * 
 * @return boolean True if the insert was successful, false otherwise
 */
public function create($conn) {
  if($this->validate()){
  $sql = "INSERT INTO articles (title, content, published_at) VALUES (:title, :content, :published_at)";
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
  $stmt->bindValue(':content', $this->content, PDO::PARAM_STR);

  $this->published_at == '' 
  ? $stmt->bindValue(':published_at', null, PDO::PARAM_NULL) 
  : $stmt->bindValue(':published_at', $this->published_at, PDO::PARAM_STR);

  if($stmt->execute()) {
    $this->id = $conn->lastInsertId();
    return true;
  }
  } else {
    return false;
  }
}
};