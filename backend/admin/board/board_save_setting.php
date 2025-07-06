<?php
header('Content-Type: application/json');
include '../../db.php';

$settings = json_decode($_POST['settings'] ?? '', true);

if (!$settings || !is_array($settings)) {
    echo json_encode(['success' => false, 'message' => '데이터 누락']);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO board_setting (`key`, `value`, `updated_at`)
    VALUES (?, ?, NOW())
    ON DUPLICATE KEY UPDATE
        `value` = VALUES(`value`),
        `updated_at` = NOW()
");

$key = '';
$value = '';
$stmt->bind_param("ss", $key, $value);

foreach ($settings as $menu => $vals) {
    // 📌 1. 배열이면 게시판 설정으로 간주
    if (is_array($vals) && count($vals) === 4) {
        list($page, $perPage, $commentPage, $commentPerPage) = $vals;

        $entries = [
            ["{$menu}_page", $page],
            ["{$menu}_per_page", $perPage],
            ["{$menu}_comment_page", $commentPage],
            ["{$menu}_comment_per_page", $commentPerPage],
        ];

        foreach ($entries as [$k, $v]) {
            $key = $k;
            $value = (string)$v;
            $stmt->execute();
        }
    }
    else {
        $key = $menu;
        $value = (string)$vals;
        $stmt->execute();
    }
}

echo json_encode(['success' => true]);
