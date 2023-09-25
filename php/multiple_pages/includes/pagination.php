<?php $base = strtok($_SERVER['REQUEST_URI'], '?'); ?>

<nav>
  <ul>
    <li>
      <?php if($pagination->previous): ?>
      <a href="<?= $base; ?>?page=<?= $pagination -> previous; ?>">Previous</a>
      <?php else: ?>
      Previous
      <?php endif; ?>
    </li>
    <li>
      <?php if($pagination->next): ?>
      <a href="<?= $base; ?>?page=<?= $pagination -> next; ?>">Next</a>
      <?php else: ?>
      Next
      <?php endif; ?>
    </li>
  </ul>
</nav>