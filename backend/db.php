<?php
$host = "localhost";
$user = "ooooo0516";
$password = "Angel0516!";
$dbname = "ooooo0516";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}
?>