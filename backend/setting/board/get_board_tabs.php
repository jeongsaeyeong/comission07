<?php
header('Content-Type: application/json');
include '../../db.php';

$menu = $_GET['menu'] ?? '';

$key = $menu . '_tabs';
$stmt = $conn->prepare("SELECT value FROM board_setting WHERE `key` = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode([
  'tabs' => $row ? json_decode($row['value'], true) : []
]);
