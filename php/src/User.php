<?php

namespace App;

use PDO;

class User
{
  public static function find(int $id)
  {
    $pdo = Database::connect();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);

    return $stmt->fetch(PDO::FETCH_OBJ);
  }

  public static function create(string $name, int $age): void
  {
    $pdo = Database::connect();
    $stmt = $pdo->prepare("INSERT INTO users (name, age) VALUES (?, ?)");
    $stmt->execute([$name, $age]);
  }

  public static function edit(int $id, string $name, int $age): void
  {
    $pdo = Database::connect();
    $stmt = $pdo->prepare("UPDATE users SET name = ?, age = ? WHERE id = ?");
    $stmt->execute([$name, $age, $id]);
  }

  public static function delete(int $id)
  {
    $pdo = Database::connect();
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
  }
}
