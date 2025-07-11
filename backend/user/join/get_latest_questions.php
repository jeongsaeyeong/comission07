<?php
header('Content-Type: application/json');
include '../../db.php';

$query = "
    SELECT t.*
    FROM questions t
    JOIN (
        SELECT question_number, MAX(id) AS max_id
        FROM questions
        GROUP BY question_number
    ) latest
    ON t.id = latest.max_id
    WHERE t.question_number IN (1, 2, 3)
    ORDER BY t.question_number
";

$result = $conn->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(['success' => true, 'data' => $data]);
?>
