import React, { useEffect, useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MyVerticallyCenteredModal from './show';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { Link } from 'react-router-dom';
import { addDoc, getDoc } from 'firebase/firestore';
import Checkinputbox from './check_inputbox';

function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchChecks();
    }, []);

    const fetchOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'orders'));
            const ordersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchChecks = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'checks'));
            const checksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setChecks(checksData);
        } catch (error) {
            console.error('Error fetching checks:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        const userDocRef = doc(database, 'orders', orderId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'trash'), userData);
            await deleteDoc(userDocRef);
            fetchOrders();
        }
    };

    const handleDeleteCheck = async (checkId) => {
        const userDocRef = doc(database, 'checks', checkId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'trash'), userData);
            await deleteDoc(userDocRef);
            fetchChecks();
        }
    };

    const handleDeleteDataFromOrders = async (numbersArray) => {
        try {
            await Promise.all(
                numbersArray.map(async (num) => {
                    const orderIndex = orders.findIndex(order => order.inv_id === num);
                    if (orderIndex !== -1) {
                        const orderId = orders[orderIndex].id;
                        await handleDeleteOrder(orderId);
                    }
                })
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control type="text" placeholder="Search" />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit">Search</Button>
                    </div>
                </div>

                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Check Received">
                            <div className='inv-dashing'>
                                <MyTable data={checks} handleDelete={handleDeleteCheck} />
                            </div>

                            <Row className='inv-content2'>
                                <Col xs={4}><Link to="user/create" id='createbutton'>Create User</Link></Col>
                                <Col xs={5}>01</Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="profile" title="Not Check Received">
                            <div className='inv-dashing'>
                                <MyTable data={orders} handleDelete={handleDeleteOrder} />
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}>Total : </Col>
                                <Col xs={5}>01</Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Checkinputbox onDeleteData={handleDeleteDataFromOrders} />
        </>
    );
}

const MyTable = ({ data, handleDelete }) => (
    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
        <table className="table table-bordered table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Invoice ID</th>
                    <th>Data Handling Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.inv_id}</td>
                        <td>
                            <Button variant="primary">More</Button>
                            <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Dashboard;
