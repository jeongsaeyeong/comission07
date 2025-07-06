<?php
header('Content-Type: application/json');
include '../../db.php';

$sql = "SELECT nickname FROM users WHERE status IN ('승인', '운영진')";
$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(['success' => true, 'users' => $users]);
