<?php
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

// If Accept button is clicked
if(isset($_POST['accept_button'])) {
    // Get the selected order ID
    $inv_id = $_POST['inv_id'];

    // Get the details of the selected order
    $sql_select_inv = "SELECT * FROM users WHERE inv_id = $inv_id";
    $result_select_inv = $conn->query($sql_select_inv);

    if ($result_select_inv->num_rows > 0) {
        $row = $result_select_inv->fetch_assoc();
        $inv_id = $row['inv_id'];
        $name = $row['name'];
        $email = $row['email'];
        $mobile = $row['mobile'];
        $created_at = $row['created_at'];


        // Delete the selected order from orders table
        $sql_delete_inv = "DELETE FROM users WHERE inv_id = $inv_id";
        if ($conn->query($sql_delete_inv) === TRUE) {
            // Insert the order into checks table
            $sql_insert_not_check = "INSERT INTO not_checked_received (inv_id, name, email, mobile, created_at) VALUES ('$inv_id', $name, $email, $mobile, $created_at)";
            if ($conn->query($sql_insert_not_check) === TRUE) {
                echo "Order accepted and moved to checks table successfully.";
            } else {
                echo "Error: " . $sql_insert_not_check . "<br>" . $conn->error;
            }
        } else {
            echo "Error: " . $sql_delete_inv . "<br>" . $conn->error;
        }
    }
}

// Fetch orders from database
$sql_select_invs = "SELECT * FROM users";
$result_select_invs = $conn->query($sql_select_invs);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Order Management</title>
</head>
<body>
    <h2>Orders</h2>
    <form method="post">
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
            <?php
            if ($result_select_orders->num_rows > 0) {
                while($row = $result_select_orders->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>".$row['id']."</td>";
                    echo "<td>".$row['item']."</td>";
                    echo "<td>".$row['quantity']."</td>";
                    echo "<td><input type='submit' name='accept_button' value='Accept'>";
                    echo "<input type='hidden' name='order_id' value='".$row['id']."'></td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>No orders available.</td></tr>";
            }
            ?>
        </table>
    </form>
</body>
</html>

<?php
// Close connection
$conn->close();
?>
