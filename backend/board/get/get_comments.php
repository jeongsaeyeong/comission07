<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_GET['board_number'] ?? '';
$post_id = $_GET['post_id'] ?? '';

if (!$board_number || !$post_id) {
    echo json_encode(['success' => false, 'message' => '파라미터 누락']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM board_comments WHERE board_number = ? AND post_id = ? ORDER BY id ASC");
$stmt->bind_param("si", $board_number, $post_id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode(['success' => true, 'comments' => $comments]);

$stmt->close();
$conn->close();
