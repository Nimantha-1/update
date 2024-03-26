<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
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

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// If Accept button is clicked
if(isset($_POST['accept_button'])) {
    // Get the selected order ID
    $order_id = $_POST['order_id'];

    // Get the details of the selected order
    $sql_select_order = "SELECT * FROM check_received WHERE inv_id = $order_id";
    $result_select_order = $conn->query($sql_select_order);

    if ($result_select_order->num_rows > 0) {
        $row = $result_select_order->fetch_assoc();
        $inv_id = $row['inv_id'];
        $name = $row['name'];
        $email = $row['email'];
        $mobile = $row['mobile'];


        // Delete the selected order from orders table
        $sql_delete_order = "DELETE FROM check_received WHERE inv_id = $order_id";
        if ($conn->query($sql_delete_order) === TRUE) {
            // Insert the order into checks table
            $sql_insert_check = "INSERT INTO trash (inv_id, name, email, mobile) VALUES ($inv_id,'$name','$email',$mobile)";
            if ($conn->query($sql_insert_check) === TRUE) {
                echo json_encode(array("message" => "Order accepted and moved to checks table successfully."));
            } else {
                echo json_encode(array("error" => "Error: " . $sql_insert_check . "<br>" . $conn->error));
            }
        } else {
            echo json_encode(array("error" => "Error: " . $sql_delete_order . "<br>" . $conn->error));
        }
    }
}

// Fetch orders from database
$sql_select_orders = "SELECT * FROM check_received";
$result_select_orders = $conn->query($sql_select_orders);
$orders = array();
if ($result_select_orders->num_rows > 0) {
    while($row = $result_select_orders->fetch_assoc()) {
        $orders[] = $row;
    }
}

// Close connection
$conn->close();

echo json_encode($orders);
?>
