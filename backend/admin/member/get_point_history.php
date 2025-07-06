<?php
header('Content-Type: application/json');
include '../../db.php';

$nickname = $_GET['nickname'] ?? '';

if (!$nickname) {
    echo json_encode(['success' => false, 'message' => '닉네임이 없습니다.']);
    exit;
}

// 닉네임으로 user_id 찾기
$stmt = $conn->prepare("SELECT id FROM users WHERE nickname = ?");
$stmt->bind_param("s", $nickname);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '유저를 찾을 수 없습니다.']);
    exit;
}

$user_id = $user['id'];

// 포인트 내역 불러오기
$stmt2 = $conn->prepare("SELECT amount, reason, created_at FROM user_points WHERE user_id = ? ORDER BY created_at DESC");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$res = $stmt2->get_result();

$give = [];
$take = [];

while ($row = $res->fetch_assoc()) {
    $item = [
        'amount' => abs($row['amount']),
        'created_at' => substr($row['created_at'], 0, 10) // YYYY-MM-DD
    ];
    if ((int)$row['amount'] > 0) {
        $give[] = $item;
    } else {
        $take[] = $item;
    }
}

echo json_encode(['success' => true, 'give' => $give, 'take' => $take]);
exit;
?>
