<?php

require __DIR__ . '/../../../vendor/autoload.php';

use App\User;

$id = $_GET['id'] ?? null;

if (!$id) {
  echo "<p>ID null!</p>";
  die();
}

$user = User::find($id);

if (!$user) {
  echo "<p>ID invalid!</p>";
  die();
}

User::delete($id);

echo "<p>Success!</p>";
