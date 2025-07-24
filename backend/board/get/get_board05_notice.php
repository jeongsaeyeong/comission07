<?php
header('Content-Type: application/json');
include '../../db.php';

$sql = "SELECT * FROM board05_notice ORDER BY created_at DESC LIMIT 1";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([
        'success' => true,
        'notice' => [
            'content' => $row['content'],
            'image' => $row['image'],
            'created_at' => $row['created_at']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => '공지 없음']);
}
