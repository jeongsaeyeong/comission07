<?php
header('Content-Type: application/json');
include '../../db.php';

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$board_number = $_POST['board_number'] ?? '';

$table = "board" . str_pad($board_number, 2, '0', STR_PAD_LEFT) . "_posts";

// 화이트리스트
$allowed = ['board01_posts','board02_posts','board03_posts','board04_posts','board05_posts'];
if (!in_array($table, $allowed)) {
    echo json_encode(['success' => false, 'message' => '허용되지 않은 테이블']);
    exit;
}

$stmt = $conn->prepare("SELECT password FROM `$table` WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$stmt->close();
$conn->close();

if ($row) {
    echo json_encode(['success' => true, 'password' => $row['password']]);
} else {
    echo json_encode(['success' => false, 'message' => '게시글 없음']);
}
