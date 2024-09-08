<?php
  // register.php

  $userData = json_decode(file_get_contents('php://input'), true);

  $username = $userData['username'];
  $email = $userData['email'];
  $password = $userData['password'];

  // Validate user data and hash password
  // ...

  // Save user data to file
  $file = 'users.txt';
  if (!file_exists($file)) {
    // Create the file if it does not exist
    fopen($file, 'w');
  }
  $userDataString = "$username|$email|$password\n";
  file_put_contents($file, $userDataString, FILE_APPEND);

  if (file_put_contents($file, $userDataString, FILE_APPEND)) {
    echo 'success';
  } else {
    echo 'error';
  }
?>