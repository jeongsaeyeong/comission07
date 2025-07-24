<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_POST['board_number'] ?? '';
$post_id = $_POST['post_id'] ?? '';
$comment_id = $_POST['comment_id'] ?? '';

if (!$board_number || !$post_id || !$comment_id) {
    echo json_encode(['success' => false, 'message' => '파라미터 누락']);
    exit;
}

$table = 'board_comments';

$stmt = $conn->prepare("DELETE FROM $table WHERE id = ? AND board_number = ? AND post_id = ?");
$stmt->bind_param("iss", $comment_id, $board_number, $post_id);
$success = $stmt->execute();
$stmt->close();

echo json_encode(['success' => $success]);
