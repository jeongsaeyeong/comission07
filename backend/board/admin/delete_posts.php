<?php
header('Content-Type: application/json');
include '../../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$board_number = $data['board_number'] ?? '';
$ids = $data['ids'] ?? [];

if (!$board_number || !is_array($ids)) {
    echo json_encode(['success' => false, 'message' => '파라미터 오류']);
    exit;
}

$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';
$id_placeholders = implode(',', array_fill(0, count($ids), '?'));
$types = str_repeat('i', count($ids));

$sql = "DELETE FROM `$table` WHERE id IN ($id_placeholders)";
$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$ids);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
