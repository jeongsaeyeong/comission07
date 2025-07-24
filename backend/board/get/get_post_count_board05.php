<?php
header('Content-Type: application/json');
include '../../db.php';

$query = "SELECT COUNT(*) AS count FROM board05_posts";
$result = $conn->query($query);
$data = $result->fetch_assoc();

echo json_encode(['success' => true, 'count' => $data['count']]);
