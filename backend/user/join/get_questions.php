<?php
header('Content-Type: application/json');
include '../../db.php';

$result = $conn->query("SELECT question_number, question_text FROM join_questions ORDER BY question_number ASC");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[$row['question_number']] = $row['question_text'];
}

echo json_encode($data);
?>
