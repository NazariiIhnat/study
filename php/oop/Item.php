<?php

class Item {
  public CONST MAX_LENGTH = 24;
  private $name;
  private $description = 'Default description';
  public static $count = 0;

  function __construct() {
    // $this->sayHello();
    static::$count++;
  }

  private function sayHello() {
    echo 'Hello world';
  }

  public function getName() {
    return $this->name;
  }

  public function setName($name) {
    $this->name = $name;
  }

  public function getDescription() {
    return $this->description;
  }

  public function setDescription($description) {
    $this->description = $description;
  }

  public static function showCount (){
    var_dump(static::$count);
  }

  public function overloadFunction() {
    return 'Hello ';
  }
}