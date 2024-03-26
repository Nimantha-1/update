<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "react-crud";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from POST request
$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['inv_id'])) {
    $checkNumbersString = $data['inv_id'];
    $checkNumbersArray = explode(',', $checkNumbersString);

    $response = array();
    $conn->begin_transaction();

    foreach($checkNumbersArray as $checkNumber) {
        $sqlSelectCheck = "SELECT * FROM not_checked_received WHERE inv_id = '$checkNumber'";
        $result = $conn->query($sqlSelectCheck);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $name = $row['name'];
            $email = $row['email'];
            $mobile = $row['mobile'];



            $sqlInsertCheckReceived = "INSERT INTO check_received (inv_id, name, email, mobile) VALUES ('$checkNumber','$name', '$email',$mobile)";
            if ($conn->query($sqlInsertCheckReceived) === TRUE) {
                $sqlDeleteNotChecked = "DELETE FROM not_checked_received WHERE inv_id = '$checkNumber'";
                if ($conn->query($sqlDeleteNotChecked) !== TRUE) {
                    $conn->rollback();
                    $response['message'] = "Error deleting row from not_checked_received table: " . $conn->error;
                    echo json_encode($response);
                    exit;
                }
            } else {
                $conn->rollback();
                $response['message'] = "Error inserting data into check_received table: " . $conn->error;
                echo json_encode($response);
                exit;
            }
        } else {
            $response['message'] = "Check number '$checkNumber' does not exist in not_checked_received table.";
            echo json_encode($response);
            exit;
        }
    }

    $conn->commit();
    $response['message'] = "Data inserted into check_received table and corresponding rows deleted from not_checked_received table successfully.";
    echo json_encode($response);
} else {
    $response['message'] = "No check numbers provided.";
    echo json_encode($response);
}

$conn->close();
?>
