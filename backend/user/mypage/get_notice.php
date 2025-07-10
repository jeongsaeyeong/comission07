<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username'] ?? '');

if (empty($username)) {
    echo json_encode(['success' => false, 'message' => '유저 이름이 필요합니다.']);
    exit;
}

// 1. 닉네임 조회
$stmt = $conn->prepare("SELECT nickname FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '해당 유저를 찾을 수 없습니다.']);
    exit;
}

$nickname = $user['nickname'];
$personalKey = 'notice_' . $nickname;
$allKey = 'notice_all';

// 2. 공지 조회
$stmt = $conn->prepare("SELECT `key`, `value` FROM board_setting WHERE `key` = ? OR `key` = ?");
$stmt->bind_param("ss", $personalKey, $allKey);
$stmt->execute();
$result = $stmt->get_result();

$notices = [
    'personal' => '',
    'all' => ''
];

while ($row = $result->fetch_assoc()) {
    if ($row['key'] === $personalKey) {
        $notices['personal'] = $row['value'];
    } else if ($row['key'] === $allKey) {
        $notices['all'] = $row['value'];
    }
}

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'data' => $notices
]);
?>
