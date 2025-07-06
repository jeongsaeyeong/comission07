<?php
header('Content-Type: application/json');
include '../../db.php';

$nickname = $_POST['nickname'] ?? '';

if (!$nickname) {
    echo json_encode(['success' => false, 'message' => '닉네임 누락']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM users WHERE nickname = ?");
$stmt->bind_param("s", $nickname);
$success = $stmt->execute();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => '삭제 실패']);
}
?>
