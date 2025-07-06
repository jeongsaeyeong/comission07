<?php
header('Content-Type: application/json');
include '../../db.php';

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

$username = sanitize($_POST['username']);
$nickname = sanitize($_POST['nickname']);
$email = sanitize($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$hint_question = sanitize($_POST['hint_question']);
$hint_answer = sanitize($_POST['hint_answer']);
$free = sanitize($_POST['free']);
$answer01 = sanitize($_POST['answer01']);
$answer02 = sanitize($_POST['answer02']);
$answer03 = sanitize($_POST['answer03']);

// 중복 검사
$check_stmt = $conn->prepare("SELECT username, nickname, email FROM users WHERE username = ? OR nickname = ? OR email = ?");
$check_stmt->bind_param('sss', $username, $nickname, $email);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    // 하나라도 일치하는 게 있다면, 상세 확인
    $check_stmt->bind_result($found_username, $found_nickname, $found_email);
    $check_stmt->fetch();

    $conflict = [];

    if ($found_username === $username) $conflict[] = '아이디가 이미 존재합니다.';
    if ($found_nickname === $nickname) $conflict[] = '닉네임이 이미 존재합니다.';
    if ($found_email === $email) $conflict[] = '이메일이 이미 존재합니다.';

    echo json_encode([
        'success' => false,
        'message' => implode(' ', $conflict)
    ]);
    exit;
}

// 이미지 업로드
$upload_dir = '../../uploads/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$profile_image_path = '';
if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === 0) {
    $ext = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
    $filename = time() . '_' . uniqid() . '.' . $ext;
    $target = $upload_dir . $filename;

    if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target)) {
        $profile_image_path = 'uploads/' . $filename;
    } else {
        echo json_encode(['success' => false, 'message' => '이미지 업로드 실패']);
        exit;
    }
}

// 저장
$query = "INSERT INTO users (
    username, nickname, email, password_hash, hint_question, hint_answer,
    profile_image, join_reason, answer01, answer02, answer03, status
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '대기')";

$stmt = $conn->prepare($query);
$stmt->bind_param("sssssssssss", $username, $nickname, $email, $password, $hint_question, $hint_answer, $profile_image_path, $free, $answer01, $answer02, $answer03);
$result = $stmt->execute();

if (!$result) {
    echo json_encode(['success' => false, 'message' => '회원 저장 실패']);
    exit;
}

echo json_encode(['success' => true]);
