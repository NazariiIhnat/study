<?php 

/**
 * Get the database connection
 * 
 * @return object Connection to MySQL server
 */
function getDB() {
  $db_host = 'localhost';
  $db_name = 'cms';
  $db_user = 'test_www';
  $db_pass = 'UHd7aFh2RNbzVVMa';

  $conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

  if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit;
  }

  return $conn;
}
?>