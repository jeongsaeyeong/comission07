<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_POST['board_number'] ?? '';
$post_id = $_POST['post_id'] ?? '';
$writer = $_POST['writer'] ?? '';
$content = $_POST['content'] ?? '';

if (!$board_number || !$post_id || !$writer || !$content) {
    echo json_encode(['success' => false, 'message' => '필수 항목 누락']);
    exit;
}

// 파일 업로드 처리
$imageName = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../../../uploads/comments/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = time() . '_' . uniqid() . '.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
}

$stmt = $conn->prepare("INSERT INTO board_comments (board_number, post_id, writer, content, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sisss", $board_number, $post_id, $writer, $content, $imageName);
$success = $stmt->execute();

echo json_encode(['success' => $success]);

$stmt->close();
$conn->close();
