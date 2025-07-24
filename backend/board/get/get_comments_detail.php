<?php
header('Content-Type: application/json');
include '../../db.php';

$postId = $_GET['post_id'] ?? '';

if (!$postId) {
    echo json_encode(['success' => false, 'message' => 'post_id 누락']);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, board_number, post_id, nickname, content,
           image1, image2, image3, image4,
           is_sensitive, created_at, parent_id
    FROM board05_comment
    WHERE post_id = ?
    ORDER BY id DESC
");
$stmt->bind_param("i", $postId);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}
$stmt->close();

echo json_encode(['success' => true, 'comments' => $comments]);
