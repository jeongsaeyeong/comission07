<?php
header('Content-Type: application/json');
include '../../db.php';

$menu = $_GET['menu'] ?? '';
if (!$menu) {
    echo json_encode(['tabs' => []]);
    exit;
}

$key = $menu . '_tabs';
$stmt = $conn->prepare("SELECT value FROM board_setting WHERE `key` = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$tabs = $row ? json_decode($row['value'], true) : [];

$board_number = str_pad(str_replace('menu', '', $menu), 2, '0', STR_PAD_LEFT);
$tabCounts = [];

foreach ($tabs as $tab) {
    $stmt = $conn->prepare("SELECT COUNT(*) as cnt FROM board01_posts WHERE board_number = ? AND tab = ? AND open_type != 'notopen'");
    $stmt->bind_param("ss", $board_number, $tab);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();
    $tabCounts[$tab] = (int)$res['cnt'];
}

$stmt = $conn->prepare("SELECT COUNT(*) as total FROM board01_posts WHERE board_number = ? AND open_type != 'notopen'");
$stmt->bind_param("s", $board_number);
$stmt->execute();
$total = $stmt->get_result()->fetch_assoc()['total'];

echo json_encode([
    'total' => (int)$total,
    'tabs' => $tabCounts
]);
