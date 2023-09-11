<?php

/**
 * Return the user authentication status
 * 
 * @return boolean true is user is logged in, false otherwise
 */
function isLoggedIn() {
  return isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'];
}

?>