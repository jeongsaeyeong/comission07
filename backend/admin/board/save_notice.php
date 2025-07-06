<?php
header('Content-Type: application/json');
include '../../db.php';

$key = $_POST['key'] ?? '';
$content = $_POST['content'] ?? '';

if (!$key || !$content) {
    echo json_encode(['success' => false, 'message' => '필수 데이터 누락']);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO board_setting (`key`, `value`, `updated_at`)
    VALUES (?, ?, NOW())
    ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = NOW()
");
$stmt->bind_param("ss", $key, $content);
$stmt->execute();

echo json_encode(['success' => true]);
