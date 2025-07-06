<?php
header('Content-Type: application/json');
include '../../db.php';

$nickname = $_POST['nickname'] ?? '';
$amount = intval($_POST['amount'] ?? 0);
$reason = $_POST['reason'] ?? '';

if (!$nickname || $amount === 0) {
    echo json_encode(['success' => false, 'message' => '필수 항목 누락']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE nickname = ?");
$stmt->bind_param("s", $nickname);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(['success' => false, 'message' => '사용자 없음']);
    exit;
}

$user_id = $user['id'];

$insert = $conn->prepare("INSERT INTO user_points (user_id, amount, reason) VALUES (?, ?, ?)");
$insert->bind_param("iis", $user_id, $amount, $reason);
$insert->execute();

echo json_encode(['success' => true]);
exit;
?>
