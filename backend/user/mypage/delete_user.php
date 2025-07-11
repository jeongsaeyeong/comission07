<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_REQUEST['username'] ?? '');

if (!$username) {
    echo json_encode(['success' => false, 'message' => '유저명이 없습니다.']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$success = $stmt->execute();
$stmt->close();
$conn->close();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'DB 삭제 실패']);
}
?>
