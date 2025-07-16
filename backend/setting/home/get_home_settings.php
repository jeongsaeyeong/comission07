<?php
header('Content-Type: application/json');
include '../../db.php';

$stmt = $conn->prepare("SELECT `key`, `value` FROM home_settings");
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[$row['key']] = $row['value'];
}

echo json_encode($data);
