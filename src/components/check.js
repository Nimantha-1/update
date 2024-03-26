import React, { useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Checkinputbox from './check_inputbox';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Check() {
    const [checks, setChecks] = useState([]);

    // Other code remains unchanged

const fetchChecks = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, 'checks'));
        const checksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setChecks(checksData);
    } catch (error) {
        console.error('Error fetching checks:', error);
    }
};

// Other code remains unchanged


    const handleDeleteCheck = async (checkId) => {
        try {
            await deleteDoc(doc(database, 'checks', checkId));
            fetchChecks();
        } catch (error) {
            console.error('Error deleting check:', error);
        }
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
                        <Tab eventKey="home" title="Received Check List">
                            <div className='inv-dashing'>
                                <Checkinputbox onDeleteData={fetchChecks} />
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Button className='printbtnx'><LocalPrintshopIcon/>&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                <Button className='printbtn'><LocalPrintshopIcon/>&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Check;
