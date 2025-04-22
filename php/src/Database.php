<?php

namespace App;

use PDO;

class Database
{
  public static function connect(): PDO
  {
    return new PDO('sqlite:' . __DIR__ . '/../database/database.sqlite');
  }
}
