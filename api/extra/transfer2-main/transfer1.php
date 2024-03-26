<?php
// Database connection
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "table1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If Accept button is clicked
if(isset($_POST['accept_button'])) {
    // Get the selected order ID
    $order_id = $_POST['order_id'];

    // Get the details of the selected order
    $sql_select_order = "SELECT * FROM orders WHERE id = $order_id";
    $result_select_order = $conn->query($sql_select_order);

    if ($result_select_order->num_rows > 0) {
        $row = $result_select_order->fetch_assoc();
        $item = $row['item'];
        $quantity = $row['quantity'];

        // Delete the selected order from orders table
        $sql_delete_order = "DELETE FROM orders WHERE id = $order_id";
        if ($conn->query($sql_delete_order) === TRUE) {
            // Insert the order into checks table
            $sql_insert_check = "INSERT INTO checks (item, quantity) VALUES ('$item', $quantity)";
            if ($conn->query($sql_insert_check) === TRUE) {
                echo "Order accepted and moved to checks table successfully.";
            } else {
                echo "Error: " . $sql_insert_check . "<br>" . $conn->error;
            }
        } else {
            echo "Error: " . $sql_delete_order . "<br>" . $conn->error;
        }
    }
}

// Fetch orders from database
$sql_select_orders = "SELECT * FROM orders";
$result_select_orders = $conn->query($sql_select_orders);
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
