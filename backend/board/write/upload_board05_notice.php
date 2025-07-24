<?php
header('Content-Type: application/json');
include '../../db.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

// 업로드 폴더 설정
$uploadDir = '../../../uploads/board05_notice/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$content = $_POST['content'] ?? '';
$content = trim($content);

$imageName = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('notice_', true) . '.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
}

$stmt = $conn->prepare("INSERT INTO board05_notice (content, image) VALUES (?, ?)");
$stmt->bind_param("ss", $content, $imageName);
$success = $stmt->execute();
$stmt->close();

if ($success) {
    echo json_encode(['success' => true, 'message' => '공지 등록 완료']);
} else {
    echo json_encode(['success' => false, 'message' => '공지 등록 실패']);
}
