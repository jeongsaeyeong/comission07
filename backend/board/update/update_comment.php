<?php
header('Content-Type: application/json');
include '../../db.php';

$comment_id = $_POST['comment_id'] ?? '';
$board_number = $_POST['board_number'] ?? '';
$post_id = $_POST['post_id'] ?? '';
$content = $_POST['content'] ?? '';
$writer = $_POST['writer'] ?? '';

if (!$comment_id || !$board_number || !$post_id || !$content || !$writer) {
    echo json_encode(['success' => false, 'message' => '필수 항목 누락']);
    exit;
}

$table = 'board_comments';
$imageName = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('comment_', true) . '.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], "../../../uploads/comments/" . $imageName);
}

if ($imageName) {
    $stmt = $conn->prepare("UPDATE $table SET content = ?, image = ? WHERE id = ? AND board_number = ? AND post_id = ?");
    $stmt->bind_param("ssiss", $content, $imageName, $comment_id, $board_number, $post_id);
} else {
    $stmt = $conn->prepare("UPDATE $table SET content = ? WHERE id = ? AND board_number = ? AND post_id = ?");
    $stmt->bind_param("siss", $content, $comment_id, $board_number, $post_id);
}

$success = $stmt->execute();
$stmt->close();

echo json_encode(['success' => $success]);
