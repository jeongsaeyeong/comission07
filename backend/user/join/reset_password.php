<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');
$new_password = $_POST['new_password'] ?? '';

if (empty($username) || empty($new_password)) {
    echo json_encode(['success' => false, 'message' => '필수 정보가 누락되었습니다.']);
    exit;
}

if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/', $new_password)) {
    echo json_encode(['success' => false, 'message' => '비밀번호 형식이 올바르지 않습니다.']);
    exit;
}

$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE username = ?");
$stmt->bind_param("ss", $hashed_password, $username);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => '비밀번호가 변경되었습니다.']);
} else {
    echo json_encode(['success' => false, 'message' => '비밀번호 변경에 실패했습니다.']);
}

$stmt->close();
$conn->close();
?>
