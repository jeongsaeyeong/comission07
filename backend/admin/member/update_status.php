<?php
header('Content-Type: application/json');
include '../../db.php';

$id = intval($_POST['id'] ?? 0);
$status = $_POST['status'] ?? '';

if (!$id || !in_array($status, ['승인', '반려'])) {
    echo json_encode(['success' => false, 'message' => '잘못된 요청']);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $id);
$result = $stmt->execute();

echo json_encode(['success' => $result]);
exit;
?>
