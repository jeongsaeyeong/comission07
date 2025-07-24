<?php
header('Content-Type: application/json');
include '../../db.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 50;
$offset = ($page - 1) * $limit;

$stmt = $conn->prepare("SELECT * FROM board05_comment ORDER BY created_at ASC LIMIT ?, ?");
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'comments' => $comments
], JSON_UNESCAPED_UNICODE);
