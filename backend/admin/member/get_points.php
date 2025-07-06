<?php
header('Content-Type: application/json');
include '../../db.php';

$nickname = $_GET['nickname'] ?? '';

$stmt = $conn->prepare("SELECT u.nickname, p.amount, p.reason, p.created_at 
                        FROM user_points p 
                        JOIN users u ON u.id = p.user_id 
                        WHERE u.nickname = ?
                        ORDER BY p.created_at DESC");
$stmt->bind_param("s", $nickname);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
