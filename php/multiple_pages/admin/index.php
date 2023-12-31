<?php

require '../includes/init.php';

Auth::requireLogin();

$conn = require '../includes/db.php';

$pagination = new Pagination($_GET['page'] ?? 1, 6, Article::getTotal($conn));

$articles = Article::getPage($conn, $pagination->limit, $pagination->offset);

?>
<?php require '../includes/header.php'; ?>

<h2>Administration</h2>

<p><a href="new-article.php">New article</a></p>

<?php if (empty($articles)) : ?>
<p>No articles found.</p>
<?php else : ?>

<table>
  <thead>
    <tr>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($articles as $article) : ?>
    <tr>
      <td>
        <a href="article.php?id=<?= $article['id']; ?>"><?= htmlspecialchars($article['title']); ?></a>
      </td>
    </tr>
    <?php endforeach; ?>
  </tbody>
</table>

<?php require '../includes/pagination.php'; ?>

<?php endif; ?>

<?php require '../includes/footer.php'; ?>