<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_GET['board_number'] ?? '';
$post_id = $_GET['post_id'] ?? '';

if (!$board_number || !$post_id) {
    echo json_encode(['success' => false, 'message' => '누락된 값']);
    exit;
}

$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM board_comments WHERE board_number = ? AND post_id = ?");
$stmt->bind_param("ss", $board_number, $post_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$count = $result['count'] ?? 0;

echo json_encode(['success' => true, 'count' => $count]);
