<?php
header('Content-Type: application/json');
include '../../db.php';

$key = $_GET['key'] ?? '';

if (!$key) {
    echo json_encode(['success' => false, 'message' => '키가 없습니다.']);
    exit;
}

$stmt = $conn->prepare("SELECT value FROM board_setting WHERE `key` = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if ($data) {
    echo json_encode(['success' => true, 'value' => $data['value']]);
} else {
    echo json_encode(['success' => false, 'message' => '설정값 없음']);
}

$stmt->close();
$conn->close();
