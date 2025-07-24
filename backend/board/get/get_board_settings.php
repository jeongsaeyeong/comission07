<?php
header('Content-Type: application/json');
include '../../db.php';

$number = $_GET['number'] ?? '';

if (!$number) {
    echo json_encode(['success' => false, 'message' => '번호가 없습니다.']);
    exit;
}

$menuKey = 'menu' . ltrim($number, '0') . '_';

$stmt = $conn->prepare("SELECT `key`, `value` FROM board_setting WHERE `key` LIKE CONCAT(?, '%')");
$stmt->bind_param("s", $menuKey);
$stmt->execute();
$result = $stmt->get_result();

$settings = [];
while ($row = $result->fetch_assoc()) {
    $settings[$row['key']] = $row['value'];
}

$stmt->close();
$conn->close();

if (!empty($settings)) {
    echo json_encode(['success' => true, 'settings' => $settings], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'message' => '설정값 없음']);
}
