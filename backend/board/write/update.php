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
$post_id = $_POST['post_id'] ?? '';
$writer = sanitize($_POST['writer'] ?? '');
$title = sanitize($_POST['title'] ?? '');
$content = $_POST['content'] ?? '';
$open = $_POST['open'] ?? 'open';
$tab = sanitize($_POST['tab'] ?? '');
$password = isset($_POST['password']) ? sanitize($_POST['password']) : null;

if (!$board_number || !$post_id || !$writer || !$title || !$content) {
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

// ✅ 실제 수정 쿼리
$sql = "UPDATE `$table` 
        SET title = ?, content = ?, open_type = ?, password = ?, tab = ?, updated_at = NOW()
        WHERE id = ? AND writer = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssis", $title, $content, $open, $password, $tab, $post_id, $writer);
$success = $stmt->execute();

if ($success && $stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => '수정 실패 또는 권한 없음']);
}

$stmt->close();
$conn->close();
