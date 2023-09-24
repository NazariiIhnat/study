<?php

require 'includes/init.php';

Auth::logout();

Url::redirect('/multiple_pages/index.php');