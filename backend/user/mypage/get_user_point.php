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

// 유저 ID 조회
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '유저를 찾을 수 없습니다.']);
    exit;
}

$user_id = $user['id'];

// 포인트 합산
$stmt = $conn->prepare("SELECT COALESCE(SUM(amount), 0) AS total_point FROM user_points WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'point' => intval($row['total_point'])]);
