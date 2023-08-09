<!-- <?php $name = 'Dave'; 
$hour = 11;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>My title</title>
</head>

<body>
  <h1>Lorem Ipsum</h1>
  <p>Hello, <?= $name; ?></p>
  <?php if($hour < 12): ?>
  <p>Good morning</p>
  <?php elseif($hour < 18): ?>
  <p>Good afternoon</p>
  <?php elseif($hour < 22): ?>
  <p>Good evening</p>
  <?php else : ?>
  <p>Good night</p>
  <?php endif; ?>
</body>

</html> -->

<!-- practice -->
<?php

$fruits = ['apple', 'banana', 'orange', 'mango'];

?>
<!DOCTYPE html>
<html>

<head>
  <title>Fruit</title>
</head>

<body>
  <h1>Fruit</h1>
  <ol>
    <?php foreach($fruits as $fruit) :?>
    <li><?= $fruit;?></li>
    <?php endforeach;?>
  </ol>
</body>

</html>