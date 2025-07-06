<?php
header('Content-Type: application/json');
include '../../db.php';

$nickname = $_POST['nickname'] ?? '';
$role = $_POST['role'] ?? '';

if (!$nickname || !in_array($role, ['운영진', '유저'])) {
    echo json_encode(['success' => false, 'message' => '잘못된 요청']);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET role = ? WHERE nickname = ?");
$stmt->bind_param("ss", $role, $nickname);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
?>
