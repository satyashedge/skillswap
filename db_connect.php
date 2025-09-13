<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "skillswap";

try {
    // Create connection with proper character encoding
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Set character encoding
    $conn->set_charset("utf8mb4");
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    die("Database connection failed: " . $e->getMessage());
}
?> 