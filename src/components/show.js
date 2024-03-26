import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from './firebaseConfig'; // Update the import statement to use 'firestore' from firebaseConfig

export default function MyVerticallyCenteredModal(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (props.inv_id) {
            getProducts(props.inv_id);
        }
    }, [props.inv_id]);

    const getProducts = async (inv_id) => {
        try {
            const q = query(collection(database, 'products'), where('inv_id', '==', inv_id));
            const querySnapshot = await getDocs(q);
            const productsData = [];
            querySnapshot.forEach((doc) => {
                productsData.push({ ...doc.data(), id: doc.id });
            });
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h1>List Products</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>product_id</th>
                                <th>product_name</th>
                                <th>product_price</th>
                                <th>product_quantity</th>
                                <th>invoice_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, key) =>
                                <tr key={key}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.inv_id}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
