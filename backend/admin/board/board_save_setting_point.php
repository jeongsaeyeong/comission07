<?php
header('Content-Type: application/json');
include '../../db.php';

// settings 값 가져오기
$settingsJson = $_POST['settings'] ?? '';

if (!$settingsJson) {
    echo json_encode(['success' => false, 'message' => '설정 데이터가 없습니다.']);
    exit;
}

$settings = json_decode($settingsJson, true);

if (!is_array($settings)) {
    echo json_encode(['success' => false, 'message' => '잘못된 JSON 데이터입니다.']);
    exit;
}

try {
    foreach ($settings as $key => $value) {
        // 포인트 설정 키만 허용
        if (!preg_match('/^menu[1-5]_point_(write|read|comment)$/', $key)) {
            continue; // 허용된 키 형식이 아니면 건너뜀
        }

        $stmt = $conn->prepare("INSERT INTO board_setting (`key`, `value`) VALUES (?, ?)
                                ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
        $stmt->bind_param('ss', $key, $value);
        $stmt->execute();
    }

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => '저장 실패: ' . $e->getMessage()]);
}
