<?php
header('Content-Type: application/json');
include '../../db.php';

try {
    $stmt = $conn->prepare("SELECT key_name, file_name FROM home_images WHERE key_name LIKE 'menu%' OR key_name LIKE 'm_%'");
    $stmt->execute();
    $result = $stmt->get_result();

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[$row['key_name']] = $row['file_name'];
    }

    echo json_encode($images);
} catch (Exception $e) {
    echo json_encode(['error' => 'DB 오류', 'message' => $e->getMessage()]);
}
