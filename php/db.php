<!-- <?php
$db_host = 'localhost';
$db_name = 'cms';
$db_user = 'cms_www';
$db_pass = 'd20O6Yg8ae.b0cgG';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(mysqli_connect_error()){
  echo mysqli_connect_error();
  exit;
}

$sql = 
"SELECT *
FROM article
ORDER BY published_at";

$results = mysqli_query($conn, $sql);
if($results === false) {
  echo mysqli_error($conn);
} else {
  $articles = mysqli_fetch_all($results, MYSQLI_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>

<body>
  <h1>Articles</h1>
  <ul>
    <?php if(empty($articles)): ?>
    <p>No articles found</p>
    <?php else :?>

    <?php foreach($articles as $article): ?>
    <li>
      <article>
        <h2><?= $article['title']; ?> </h2>
        <p> <?= $article['content']; ?> </p>
        <p> <?= $article['published_at']; ?></p>
      </article>
    </li>
    <?php endforeach;?>
  </ul>
  <?php endif; ?>
</body>

</html> -->

<!-- practice -->