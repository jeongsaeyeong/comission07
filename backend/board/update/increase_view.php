<?php
header('Content-Type: application/json');
include '../../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$board_number = $data['board_number'] ?? '';
$post_id = $data['post_id'] ?? '';

if (!$board_number || !$post_id) {
    echo json_encode(['success' => false, 'message' => '누락된 값']);
    exit;
}

$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';

$stmt = $conn->prepare("UPDATE `$table` SET views = views + 1 WHERE id = ?");
$stmt->bind_param("i", $post_id);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
