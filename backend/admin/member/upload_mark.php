<?php
header('Content-Type: application/json');
include '../../db.php';

$upload_dir = '../../uploads/marks/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== 0) {
    echo json_encode(['success' => false, 'message' => '파일 업로드 실패']);
    exit;
}

$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$filename = time() . '_' . uniqid() . '.' . $ext;
$target = $upload_dir . $filename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
    echo json_encode(['success' => true, 'path' => 'uploads/marks/' . $filename]);
} else {
    echo json_encode(['success' => false, 'message' => '파일 저장 실패']);
}
