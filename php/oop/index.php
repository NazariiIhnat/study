<?php

require 'Item.php';
require 'Book.php';

Item::showCount();
$my_item = new Item();
Item::showCount();
$my_second_item = new Item();
Item::showCount();
define('TEST_CONST', 'TEST');
echo TEST_CONST;
echo Item::MAX_LENGTH;

// $my_item->setName('Another book');
// $my_item->price = 2.99;

// var_dump($my_item); 

$my_book = new Book();
$my_book->setName('Book random name');
echo $my_book->getName();
echo $my_book->overloadFunction();