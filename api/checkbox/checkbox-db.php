<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$con = mysqli_connect('localhost:3307', 'root', '', 'react-crud');

if(mysqli_connect_errno()) {
    echo json_encode(array('error' => 'Failed to connect ' . mysqli_connect_error()));
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $inv_id = $_GET['inv_id'] ?? null; // Get inv_id from request query parameters
        if ($inv_id) {
            $sql = "SELECT * FROM product WHERE inv_id = " . mysqli_real_escape_string($con, $inv_id);
        } else {
            $sql = "SELECT * FROM product";
        }
        $result = mysqli_query($con, $sql);
        $products = [];
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $products[] = $row;
            }
        }
        echo json_encode($products);
        break;

    case "POST":
        $postData = json_decode(file_get_contents('php://input'), true);
        foreach ($postData as $product) {
            $prodname = $product['name'];
            $prod_price = $product['price'];
            $prod_qty = $product['quantity'];
            $inv_id = $product['inv_id'];
            
            $insertqry = "INSERT INTO `product`(`product_name`, `product_price`, `product_quantity`, `inv_id`) 
                          VALUES ('$prodname','$prod_price','$prod_qty','$inv_id')";
            mysqli_query($con, $insertqry);
        }
        
        echo json_encode(array('message' => 'Data inserted successfully'));
        break;

 
}
?>
