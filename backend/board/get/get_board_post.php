<?php
header('Content-Type: application/json');
include '../../db.php';

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(['success' => false, 'message' => '글 ID 누락']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM board_posts WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    echo json_encode(['success' => true, 'post' => $row]);
} else {
    echo json_encode(['success' => false, 'message' => '글을 찾을 수 없습니다.']);
}
