<?php
header('Content-Type: application/json');
include '../../db.php';

$key = trim($_POST['key'] ?? '');
$file = $_FILES['file'] ?? null;

if (!$key || !$file) {
    echo json_encode(['success' => false, 'message' => '키 또는 파일 없음']);
    exit;
}

$upload_dir = '../../../uploads/admin/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = time() . '_' . uniqid() . '.' . $ext;
$filepath = $upload_dir . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    $stmt = $conn->prepare("
        INSERT INTO home_images (key_name, file_name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE file_name = VALUES(file_name)
    ");
    $stmt->bind_param('ss', $key, $filename);
    $success = $stmt->execute();

    echo json_encode(['success' => $success, 'filename' => $filename]);
} else {
    echo json_encode(['success' => false, 'message' => '업로드 실패']);
}
