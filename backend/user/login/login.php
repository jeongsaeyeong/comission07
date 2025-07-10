<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => '아이디와 비밀번호를 입력해주세요.']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password_hash'])) {
    if ($user['status'] === '승인') {
        echo json_encode(['success' => true, 'message' => '로그인 성공']);
    } elseif ($user['status'] === '대기') {
        echo json_encode(['success' => false, 'message' => '신청이 승인되지 않았습니다.']);
    } elseif ($user['status'] === '반려') {
        echo json_encode(['success' => false, 'message' => '신청이 반려되었습니다.']);
    } else {
        echo json_encode(['success' => false, 'message' => '알 수 없는 계정 상태입니다.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '아이디 또는 비밀번호가 올바르지 않습니다.']);
}

$stmt->close();
$conn->close();
?>
