<?php
header('Content-Type: application/json');
include '../../db.php';

$key = trim($_POST['key'] ?? '');
$value = trim($_POST['value'] ?? '');

if (!$key) {
    echo json_encode(['success' => false, 'message' => 'key 없음']);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO home_settings (`key`, `value`)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE value = VALUES(value)
");
$stmt->bind_param('ss', $key, $value);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
