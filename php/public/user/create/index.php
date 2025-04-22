<?php

require __DIR__ . '/../../../vendor/autoload.php';

use App\User;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'] ?? '';
  $age = (int) ($_POST['age'] ?? 0);

  if ($name && $age) {
    User::create($name, $age);

    echo "<p>Success!</p>";
  }
}
?>

<link href="../../assets/style.css" rel="stylesheet">

<div class="center">
  <form method="POST">
    <table>
      <tr>
        <td><label for="name">Name:</label></td>
        <td><input type="text" id="name" name="name" placeholder="Name" required></td>
      </tr>
      <tr>
        <td><label for="age">Age:</label></td>
        <td><input type="number" id="age" name="age" placeholder="Age" required></td>
      </tr>
    </table>

    <button type="submit">Enviar</button>
  </form>
</div>
