<?php
header('Content-Type: application/json');
include '../../db.php';

$key = 'anonymous_nickname';

$stmt = $conn->prepare("SELECT value FROM board_setting WHERE `key` = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        'success' => true,
        'nickname' => $row['value']
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'message' => '익명 닉네임 설정값 없음'
    ], JSON_UNESCAPED_UNICODE);
}

$stmt->close();
$conn->close();
