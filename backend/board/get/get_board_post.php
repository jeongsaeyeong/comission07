<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_GET['number'] ?? '';
$id = $_GET['id'] ?? '';

if (!$board_number || !$id) {
    echo json_encode(['success' => false, 'message' => '필수 값 누락']);
    exit;
}

if (!preg_match('/^[0-9]+$/', $board_number) || !preg_match('/^[0-9]+$/', $id)) {
    echo json_encode(['success' => false, 'message' => '잘못된 파라미터']);
    exit;
}

$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';

// 테이블 존재 확인
$check = $conn->query("SHOW TABLES LIKE '$table'");
if ($check->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => '해당 게시판이 존재하지 않습니다.']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM `$table` WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    echo json_encode(['success' => true, 'post' => $row]);
} else {
    echo json_encode(['success' => false, 'message' => '글을 찾을 수 없습니다.']);
}

$stmt->close();
$conn->close();
