<?php
header('Content-Type: application/json');
include '../../db.php';

$key = trim($_GET['key'] ?? '');

if (!$key) {
    echo json_encode(['success' => false, 'message' => 'key 없음']);
    exit;
}

$stmt = $conn->prepare("SELECT file_name FROM home_images WHERE key_name = ?");
$stmt->bind_param('s', $key);
$stmt->execute();
$stmt->bind_result($file_name);

if ($stmt->fetch()) {
    echo json_encode(['success' => true, 'file_name' => $file_name]);
} else {
    echo json_encode(['success' => false, 'message' => '해당 이미지 없음']);
}
