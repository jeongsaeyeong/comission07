<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_GET['board_number'] ?? '';
$tab = $_GET['tab'] ?? '';

if (!$board_number) {
    echo json_encode(['success' => false, 'message' => '게시판 번호 누락']);
    exit;
}

if (!preg_match('/^[0-9]+$/', $board_number)) {
    echo json_encode(['success' => false, 'message' => '잘못된 게시판 번호']);
    exit;
}

$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';

if ($tab && $tab !== 'all') {
    $stmt = $conn->prepare("SELECT * FROM `$table` WHERE tab = ? AND open_type != 'notopen' ORDER BY id DESC");
    $stmt->bind_param("s", $tab);
} else {
    $stmt = $conn->prepare("SELECT * FROM `$table` WHERE open_type != 'notopen' ORDER BY id DESC");
}

$stmt->execute();
$result = $stmt->get_result();
$rows = [];

while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode(['success' => true, 'posts' => $rows]);

$stmt->close();
$conn->close();
