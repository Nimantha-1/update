import React, { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

function FirebaseFirestore() {
    const [foodCode, setFoodCode] = useState('');
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);

    const value = collection(database, 'priceList');

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(value);
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItems(data);
        };
        fetchData();

        // Listen for real-time updates
        const unsubscribe = onSnapshot(value, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItems(data);
        });

        // Unsubscribe from real-time updates when component unmounts
        return () => unsubscribe();
    }, []);

    const handleCreate = async () => {
        await addDoc(value, { foodCode, foodName, price });
        setFoodCode('');
        setFoodName('');
        setPrice('');
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(database, 'priceList', id));
    };

    const handleEdit = (id, foodCode, foodName, price) => {
        setFoodCode(foodCode);
        setFoodName(foodName);
        setPrice(price);
        setId(id);
        setShow(true);
    };

    const handleUpdate = async () => {
        const updateData = doc(database, 'priceList', id);
        await updateDoc(updateData, {
            oldPrice: price,
            price: price
        });
        setShow(false);
        setFoodCode('');
        setFoodName('');
        setPrice('');
    };

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit">Search</Button>
                    </div>
                </div>

                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Latest Prices">
                            <div className='inv-dashing'>
                                <div className="App">
                                    <div className='container'>
                                        <input value={foodCode} onChange={(e) => setFoodCode(e.target.value)} />
                                        <input value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} />
                                        {!show ? <button onClick={handleCreate}>Create</button> :
                                            <button onClick={handleUpdate}>Update</button>}
                                        {
                                            items.map(item =>
                                                <div key={item.id}>
                                                    <h1>{item.foodCode}</h1>
                                                    <h1>{item.foodName}</h1>
                                                    <h1>{item.price}</h1>
                                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                                    <button onClick={() => handleEdit(item.id, item.foodCode, item.foodName, item.price)}>Edit</button>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Button className='printbtnx'><AddBoxIcon />&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default FirebaseFirestore;
