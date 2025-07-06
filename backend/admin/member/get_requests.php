<?php
header('Content-Type: application/json');
include '../../db.php';

$sql = "SELECT * FROM users WHERE status = '대기' ORDER BY id DESC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
