<?php
header('Content-Type: application/json');
include '../../db.php';

$key = trim($_GET['key'] ?? '');

if (!$key) {
    echo json_encode(['success' => false, 'message' => 'key 없음']);
    exit;
}

$stmt = $conn->prepare("SELECT value FROM home_settings WHERE `key` = ?");
$stmt->bind_param('s', $key);
$stmt->execute();
$stmt->bind_result($value);

if ($stmt->fetch()) {
    echo json_encode(['success' => true, 'value' => $value]);
} else {
    echo json_encode(['success' => false, 'message' => '설정 없음']);
}
