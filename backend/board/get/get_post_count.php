<?php
header('Content-Type: application/json');
include '../../db.php';

$board_number = $_GET['board_number'] ?? '';
$tab = $_GET['tab'] ?? '';

if (!$board_number || !preg_match('/^[0-9]+$/', $board_number)) {
    echo json_encode(['success' => false, 'message' => '유효한 게시판 번호가 필요합니다.']);
    exit;
}

$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';

$check = $conn->query("SHOW TABLES LIKE '$table'");
if ($check->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => '존재하지 않는 테이블']);
    exit;
}

if ($tab && $tab !== 'all') {
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM `$table` WHERE tab = ? AND open_type != 'notopen'");
    $stmt->bind_param("s", $tab);
} else {
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM `$table` WHERE open_type != 'notopen'");
}

$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'count' => $data['count'] ?? 0
]);

$stmt->close();
$conn->close();
