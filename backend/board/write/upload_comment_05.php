<?php
header('Content-Type: application/json');
include '../../db.php';

// post_id는 필수!
$post_id = $_POST['post_id'] ?? '';
$nickname = $_POST['nickname'] ?? '';
$content = $_POST['content'] ?? '';
$is_sensitive = $_POST['is_sensitive'] ?? '0';
$parent_id = $_POST['parent_id'] ?? null;

if (!$post_id || !$nickname || !$content) {
    echo json_encode(['success' => false, 'message' => '필수 항목 누락']);
    exit;
}

$uploadDir = '../../../uploads/board05/';
$imageNames = [];

for ($i = 1; $i <= 4; $i++) {
    if (!empty($_FILES["image$i"]["name"])) {
        $ext = pathinfo($_FILES["image$i"]["name"], PATHINFO_EXTENSION);
        $filename = time() . "_img$i" . uniqid() . "." . $ext;
        $filepath = $uploadDir . $filename;

        if (move_uploaded_file($_FILES["image$i"]["tmp_name"], $filepath)) {
            $imageNames[$i] = $filename;
        }
    }
}

$stmt = $conn->prepare("INSERT INTO board05_comment 
    (board_number, post_id, nickname, content, image1, image2, image3, image4, is_sensitive, parent_id, created_at)
    VALUES ('05', ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

$stmt->bind_param(
    "issssssii",
    $post_id,
    $nickname,
    $content,
    $imageNames[1],
    $imageNames[2],
    $imageNames[3],
    $imageNames[4],
    $is_sensitive,
    $parent_id
);

$success = $stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(['success' => $success]);
