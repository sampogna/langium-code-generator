<?php

require __DIR__ . '/../../../vendor/autoload.php';

use App\User;

$id = $_GET['id'] ?? null;

if (!$id) {
  echo "<p>ID null!</p>";
  die();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'] ?? '';
  $age = (int) ($_POST['age'] ?? 0);

  if ($name && $age) {
    User::edit($id, $name, $age);

    echo "<p>Success!</p>";
  }
}

$user = User::find($id);

if (!$user) {
  echo "<p>ID invalid!</p>";
  die();
}

$name = $user->name;
$age = $user->age;
?>

<link href="../../assets/style.css" rel="stylesheet">

<div class="center">
  <form method="POST">
    <table>
      <tr>
        <td><label for="name">Name:</label></td>
        <td><input type="text" name="name" placeholder="Name" value="<?php echo $name ?>" required></td>
      </tr>
      <tr>
        <td><label for="age">Age:</label></td>
        <td><input type="number" name="age" placeholder="Age" value="<?php echo $age ?>" required></td>
      </tr>
    </table>

    <button type="submit">Enviar</button>
  </form>
</div>
