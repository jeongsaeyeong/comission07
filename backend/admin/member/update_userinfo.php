<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$field = isset($_POST['field']) ? sanitize($_POST['field']) : '';
$value = isset($_POST['value']) ? sanitize($_POST['value']) : '';

$allowed_fields = ['username', 'nickname', 'email'];

if ($id === 0 || !in_array($field, $allowed_fields)) {
    echo json_encode(['success' => false, 'message' => '잘못된 요청입니다.']);
    exit;
}

// 중복 체크
$check_sql = "SELECT id FROM users WHERE $field = ? AND id != ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("si", $value, $id);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => '이미 사용 중인 값입니다.']);
    exit;
}

// 업데이트 진행
$update_stmt = $conn->prepare("UPDATE users SET $field = ? WHERE id = ?");
$update_stmt->bind_param("si", $value, $id);

if ($update_stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'DB 업데이트 실패']);
}

$check_stmt->close();
$update_stmt->close();
$conn->close();
?>
