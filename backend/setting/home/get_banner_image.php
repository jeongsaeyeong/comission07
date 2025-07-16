<?php
header('Content-Type: application/json');
include '../../db.php';

$keys = ['banner', 'm_banner'];
$placeholders = implode(',', array_fill(0, count($keys), '?'));

$stmt = $conn->prepare("SELECT key_name, file_name FROM home_images WHERE key_name IN ($placeholders)");
$stmt->bind_param(str_repeat('s', count($keys)), ...$keys);
$stmt->execute();
$result = $stmt->get_result();

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[$row['key_name']] = $row['file_name'];
}

echo json_encode($images);
