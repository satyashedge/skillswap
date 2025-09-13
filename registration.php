<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registration";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    $errors = [];

    // Basic validation
    if (empty($fullname) || strlen($fullname) < 2) {
        $errors[] = "Full name must be at least 2 characters.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if (!in_array($gender, ['male', 'female', 'other'])) {
        $errors[] = "Invalid gender.";
    }
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters.";
    }
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match.";
    }

    // Check if email already exists
    $check_email = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $check_email->bind_param("s", $email);
    $check_email->execute();
    $result = $check_email->get_result();
    
    if ($result->num_rows > 0) {
        $errors[] = "Email already exists.";
    }
    $check_email->close();

    if (empty($errors)) {
       
        $stmt = $conn->prepare("INSERT INTO users (fullname, email, gender, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullname, $email, $gender, $password);
        
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}
?>