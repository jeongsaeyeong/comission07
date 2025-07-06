<?php
header('Content-Type: application/json');
include '../../db.php';

$number = intval($_POST['question_number'] ?? 0);
$text = trim($_POST['question_text'] ?? '');

if (!$number || !$text) {
    echo json_encode(['success' => false, 'message' => '질문 번호 또는 내용 누락']);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO join_questions (question_number, question_text)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE question_text = VALUES(question_text)
");
$stmt->bind_param('is', $number, $text);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
?>
