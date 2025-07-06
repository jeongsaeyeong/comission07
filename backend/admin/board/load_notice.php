<?php
header('Content-Type: application/json');
include '../../db.php';

$key = $_GET['key'] ?? '';

$stmt = $conn->prepare("SELECT `value` FROM board_setting WHERE `key` = ? LIMIT 1");
$stmt->bind_param("s", $key);
$stmt->execute();
$stmt->bind_result($value);

if ($stmt->fetch()) {
    echo json_encode(['success' => true, 'value' => $value]);
} else {
    echo json_encode(['success' => false, 'message' => '공지 없음']);
}
