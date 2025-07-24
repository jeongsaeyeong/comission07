<?php
header('Content-Type: application/json');
include '../../db.php';

$postId = $_GET['id'] ?? '';

if (!$postId) {
    echo json_encode(['success' => false, 'message' => 'post id 누락']);
    exit;
}

$stmt = $conn->prepare("SELECT id, nickname, content, image1, image2, image3, image4, is_sensitive, created_at FROM board05_posts WHERE id = ?");
$stmt->bind_param("i", $postId);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
$stmt->close();

if ($data) {
    echo json_encode(['success' => true, 'post' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => '해당 게시글 없음']);
}
