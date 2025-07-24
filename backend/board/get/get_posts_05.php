<?php
header('Content-Type: application/json');
include '../../db.php';

// 페이지 번호
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// board_setting에서 menu5_per_page 불러오기
$settingKey = 'menu5_per_page';
$settingStmt = $conn->prepare("SELECT value FROM board_setting WHERE `key` = ?");
$settingStmt->bind_param("s", $settingKey);
$settingStmt->execute();
$settingResult = $settingStmt->get_result();
$settingRow = $settingResult->fetch_assoc();
$settingStmt->close();

$limit = isset($settingRow['value']) ? (int)$settingRow['value'] : 10; // 기본값 10
$offset = ($page - 1) * $limit;

$sql = "SELECT id, nickname, content, image1, image2, image3, image4, is_sensitive, created_at
        FROM board05_posts
        ORDER BY id DESC
        LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();

$result = $stmt->get_result();
$posts = [];

while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode(['success' => true, 'posts' => $posts]);

$stmt->close();
$conn->close();
