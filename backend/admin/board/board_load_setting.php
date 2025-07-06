<?php
header('Content-Type: application/json');
include '../../db.php';

$key = trim($_GET['key'] ?? '');

if ($key) {
    $stmt = $conn->prepare("SELECT `value` FROM board_setting WHERE `key` = ? LIMIT 1");
    $stmt->bind_param('s', $key);
    $stmt->execute();
    $stmt->bind_result($value);

    if ($stmt->fetch()) {
        echo json_encode(['success' => true, 'value' => $value]);
    } else {
        echo json_encode(['success' => false, 'message' => '설정 없음']);
    }
} else {
    $sql = "SELECT `key`, `value` FROM board_setting";
    $result = $conn->query($sql);

    $raw = [];
    while ($row = $result->fetch_assoc()) {
        $raw[$row['key']] = $row['value'];
    }

    $menus = ['menu1', 'menu2', 'menu3', 'menu4', 'menu5'];
    $settings = [];

    foreach ($menus as $menu) {
        $settings[$menu] = [
            $raw["{$menu}_page"] ?? '',
            $raw["{$menu}_per_page"] ?? '',
            $raw["{$menu}_comment_page"] ?? '',
            $raw["{$menu}_comment_per_page"] ?? ''
        ];
    }

    echo json_encode(['success' => true, 'settings' => $settings]);
}
