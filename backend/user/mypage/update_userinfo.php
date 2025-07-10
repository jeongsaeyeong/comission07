<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($s) {
    return htmlspecialchars(trim($s), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');
$nickname = sanitize($_POST['nickname'] ?? '');
$password = $_POST['password'] ?? ''; // 비밀번호는 해시할 예정

if (!$username || !$nickname) {
    echo json_encode(['success' => false, 'message' => '필수 값 누락']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '사용자 없음']);
    exit;
}

if ($password) {
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET nickname = ?, password_hash = ? WHERE username = ?");
    $stmt->bind_param("sss", $nickname, $password_hash, $username);
} else {
    $stmt = $conn->prepare("UPDATE users SET nickname = ? WHERE username = ?");
    $stmt->bind_param("ss", $nickname, $username);
}

$success = $stmt->execute();
$stmt->close();
$conn->close();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'DB 업데이트 실패']);
}
