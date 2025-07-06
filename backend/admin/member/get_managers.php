<?php
header('Content-Type: application/json');
include '../../db.php';

$sql = "SELECT nickname FROM users WHERE role = '운영진'";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row['nickname'];
}

echo json_encode($data);
?>
