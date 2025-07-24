<?php
header('Content-Type: application/json');
include '../../db.php';

$key = 'total_profile';

$stmt = $conn->prepare("SELECT file_name FROM home_images WHERE key_name = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        'success' => true,
        'file_name' => $row['file_name']
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'message' => '프로필 이미지 없음'
    ], JSON_UNESCAPED_UNICODE);
}
