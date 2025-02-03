<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$adminPath = 'D:/BISWAJIT/MY WORK_05-04-2024/WEBSITE/ALL SOLUTION ARE IN SINGLE PLACE(FINAL)/admin';

function saveUserData($userData) {
    global $adminPath;
    $userId = $userData['id'];
    $userPath = $adminPath . '/users/' . $userId;
    
    if (!file_exists($userPath)) {
        mkdir($userPath, 0777, true);
    }
    
    // Save profile data
    file_put_contents($userPath . '/profile.json', json_encode($userData));
    
    // Initialize services file
    if (!file_exists($userPath . '/services.json')) {
        file_put_contents($userPath . '/services.json', json_encode([]));
    }
    
    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';
    
    switch ($action) {
        case 'register':
            $response = saveUserData($data['user']);
            echo json_encode(['success' => $response]);
            break;
            
        case 'login':
            $email = $data['email'];
            $password = $data['password'];
            
            // Read users directory
            $users = [];
            $usersDir = $adminPath . '/users';
            if (is_dir($usersDir)) {
                foreach (glob($usersDir . '/*') as $userDir) {
                    $profile = json_decode(file_get_contents($userDir . '/profile.json'), true);
                    if ($profile['email'] === $email) {
                        $users[] = $profile;
                    }
                }
            }
            
            $user = array_filter($users, function($u) use ($email, $password) {
                return $u['email'] === $email && $u['password'] === $password;
            });
            
            if (count($user) > 0) {
                echo json_encode(['success' => true, 'user' => reset($user)]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
            break;
    }
}
?> 