<?php
header('Content-Type: application/json');
include '../../db.php';

ini_set('display_errors', 0); // 화면 출력 X
error_reporting(E_ALL); // 모든 오류 감지

// 에러를 JSON으로 넘겨주는 핸들러
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    echo json_encode([
        'success' => false,
        'message' => 'PHP 오류 발생',
        'error' => "$errstr in $errfile on line $errline"
    ]);
    exit;
});

set_exception_handler(function ($e) {
    echo json_encode([
        'success' => false,
        'message' => '예외 발생',
        'error' => $e->getMessage()
    ]);
    exit;
});

// 입력 처리
$nickname = $_POST['nickname'] ?? '';
$content = $_POST['content'] ?? '';
$is_sensitive = isset($_POST['is_sensitive']) ? 1 : 0;

if (!$nickname || !$content) {
    echo json_encode([
        'success' => false,
        'message' => '닉네임과 내용을 입력하세요.'
    ]);
    exit;
}

// 업로드 폴더
$upload_dir = '../../../uploads/board05/';
if (!file_exists($upload_dir)) {
    if (!mkdir($upload_dir, 0777, true)) {
        echo json_encode([
            'success' => false,
            'message' => '업로드 폴더 생성 실패'
        ]);
        exit;
    }
}

$image_names = [];
for ($i = 1; $i <= 4; $i++) {
    if (isset($_FILES["image$i"]) && $_FILES["image$i"]["error"] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES["image$i"]["name"], PATHINFO_EXTENSION);
        $filename = time() . "_img$i" . uniqid() . '.' . $ext;
        if (!move_uploaded_file($_FILES["image$i"]["tmp_name"], $upload_dir . $filename)) {
            echo json_encode([
                'success' => false,
                'message' => "image$i 업로드 실패"
            ]);
            exit;
        }
        $image_names[$i] = $filename;
    } else {
        $image_names[$i] = null;
    }
}

// DB 저장
$stmt = $conn->prepare("INSERT INTO board05_posts (nickname, content, image1, image2, image3, image4, is_sensitive) VALUES (?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'SQL 준비 실패',
        'error' => $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "ssssssi",
    $nickname,
    $content,
    $image_names[1],
    $image_names[2],
    $image_names[3],
    $image_names[4],
    $is_sensitive
);

$success = $stmt->execute();

echo json_encode([
    'success' => $success,
    'message' => $success ? '게시 성공' : 'DB 저장 실패',
    'error' => $stmt->error,
    'debug' => [
        'image1' => $image_names[1],
        'image2' => $image_names[2],
        'image3' => $image_names[3],
        'image4' => $image_names[4]
    ]
]);

$stmt->close();
$conn->close();
