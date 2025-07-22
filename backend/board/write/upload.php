<?php
header('Content-Type: application/json');
include '../../db.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$board_number = $_POST['board_number'] ?? '';
$writer = sanitize($_POST['writer'] ?? '');
$title = sanitize($_POST['title'] ?? '');
$content = $_POST['content'] ?? '';
$open = $_POST['open'] ?? 'open';
$tab = sanitize($_POST['tab'] ?? '');
$password = isset($_POST['password']) ? sanitize($_POST['password']) : null;

if (!$board_number || !$writer || !$title || !$content) {
    echo json_encode(['success' => false, 'message' => '필수 항목 누락']);
    exit;
}

// 테이블명 조합
$table = 'board' . str_pad($board_number, 2, '0', STR_PAD_LEFT) . '_posts';

// 존재 확인
$check = $conn->query("SHOW TABLES LIKE '$table'");
if ($check->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => '존재하지 않는 게시판 테이블']);
    exit;
}

// ✅ board_number도 INSERT 대상에 포함
$sql = "INSERT INTO `$table` 
    (board_number, writer, title, content, open_type, password, tab, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $board_number, $writer, $title, $content, $open, $password, $tab);
$success = $stmt->execute();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'DB 저장 실패']);
}

$stmt->close();
$conn->close();
