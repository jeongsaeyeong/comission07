<?php
header('Content-Type: application/json');
include '../../db.php';

$key = 'main_color';
$stmt = $conn->prepare("SELECT value FROM home_settings WHERE `key` = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode(['value' => $row ? $row['value'] : '#95A9C6']); // 기본값
