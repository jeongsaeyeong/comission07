<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');

if (!$username) {
    echo json_encode(['success' => false, 'message' => '유저명이 없습니다.']);
    exit;
}

// 승인된 유저만 조회
$stmt = $conn->prepare("SELECT username, nickname, email, profile_image FROM users WHERE username = ? AND status = '승인'");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
$conn->close();

if ($user) {
    echo json_encode(['success' => true, 'data' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => '사용자를 찾을 수 없습니다.']);
}
?>
