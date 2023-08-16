<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
  var_dump($_POST);
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <form method="post">
    <!-- <input name="username">
    <input type="password" name="password">
    <button>Send</button> -->
    <!-- <div>
      text: <input type="text" name="text">
    </div>
    <div>
      password: <input type="password" name="password">
    </div>
    <div>
      tel: <input type="tel" name="tel">
    </div>
    <div>
      url: <input type="url" name="url">
    </div>
    <div>
      date: <input type="date" name="date">
    </div>
    <div>
      time: <input type="time" name="time">
    </div>
    <div>
      week: <input type="week" name="week">
    </div>
    <div>
      color: <input type="color" name="color">
    </div>
    <div>
      email: <input type="email" name="email">
    </div>
    <div>
      month: <input type="month" name="month">
    </div>
    <div>
      range: <input type="range" name="range">
    </div>
    <div>
      hidden: <input type="hidden" name="hidden">
    </div>
    <div>
      number: <input type="number" name="number">
    </div>
    <div>
      search: <input type="search" name="search">
    </div>
    <div>
      datetime-local: <input type="datetime-local" name="datetime-local">
    </div> -->
    <div>
      <input type="text" value="title">
      <textarea name="content" id="" cols="30" rows="10"></textarea>
    </div>

    <label for="desc"></label>
    <textarea name="description" id="desc"></textarea>

    <label for="size">Size</label>
    <select name="size" id="size">
      <option value="one">One</option>
      <option value="two">Two</option>
      <option value="three">Three</option>
    </select>
    <button>SEND</button>
  </form>
</body>

</html>