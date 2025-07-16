<?php
header('Content-Type: application/json');
include '../../db.php';

$key = 'background_image';
$stmt = $conn->prepare("SELECT file_name FROM home_images WHERE key_name = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode(['file_name' => $row ? $row['file_name'] : null]);
