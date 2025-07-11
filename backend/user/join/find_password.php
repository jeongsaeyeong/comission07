<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$hint_answer = sanitize($_POST['hint_answer'] ?? '');

if (empty($username) || empty($email) || empty($hint_answer)) {
    echo json_encode(['success' => false, 'message' => '모든 항목을 입력해 주세요.']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '존재하지 않는 아이디입니다.']);
    exit;
}

if ($user['email'] !== $email) {
    echo json_encode(['success' => false, 'message' => '이메일이 일치하지 않습니다.']);
    exit;
}

if ($user['hint_answer'] !== $hint_answer) {
    echo json_encode(['success' => false, 'message' => '힌트 답변이 일치하지 않습니다.']);
    exit;
}

if ($user['status'] === '대기') {
    echo json_encode(['success' => false, 'message' => '승인이 대기 중인 계정입니다.']);
    exit;
}

if ($user['status'] === '반려') {
    echo json_encode(['success' => false, 'message' => '반려된 계정입니다.']);
    exit;
}

echo json_encode(['success' => true, 'message' => '인증 완료']);
$conn->close();
?>
