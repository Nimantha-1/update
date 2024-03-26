import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { database } from './firebaseConfig'; // Update the import statement to use 'firestore' from firebaseConfig
import { useNavigate } from 'react-router-dom';

function ItemList() {
  const [products, setProducts] = useState([
    { name: 'Car', price: 0, quantity: 0, inv_id: 0 },
    { name: 'Bike', price: 0, quantity: 0, inv_id: 0 },
    { name: 'Accessories', price: 0, quantity: 0, inv_id: 0 }
  ]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Loop through each product and add it to the Firestore collection
      for (const product of products) {
        await addProductToFirestore(product);
      }
      // Handle success
      alert('Data submitted successfully');
      navigate('/order');
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }
  };

  // Function to add a single product to Firestore
  const addProductToFirestore = async (product) => {
    try {
      await addDoc(collection(database, 'products'), product);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error; // Re-throw the error to be caught in the handleSubmit function
    }
  };

  const handleChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h4>Multiple Checkbox</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>invoice_id</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td><input type="checkbox" name="prodid[]" value={product.name} /></td>
                <td>{product.name}</td>
                <td><input type="number" value={product.price} onChange={(e) => handleChange(index, 'price', e.target.value)} className="form-control" /></td>
                <td><input type="number" value={product.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)} className="form-control" /></td>
                <td><input type="number" value={product.inv_id} onChange={(e) => handleChange(index, 'inv_id', e.target.value)} className="form-control" /></td>

              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <input type="submit" name="submit" className="btn btn-success" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default ItemList;
