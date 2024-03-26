import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbarcom.css";
import Nav from 'react-bootstrap/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Pro from "../img/pro.jpg";
import Worldball from "../img/world-ball.png";
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import Notifications from './notifications';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuIcon from '@mui/icons-material/Menu';

function NavBarCom() {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname);
    const navigate = useNavigate();

    const handleNavSelect = (eventKey) => {
        navigate(eventKey);
        setActiveKey(eventKey);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*notification useStates */
    const [showNoti, setShowNoti] = useState(false);
    const handleCloseNoti = () => setShowNoti(false);
    const handleShowNoti = () => setShowNoti(true);

    return (
        <div className='backgroundmain'>
            

            <Offcanvas show={show} onHide={handleClose} placement="start" className="mobcolor">
                
                <Offcanvas.Body>
                    <Nav variant="pills" activeKey={activeKey} onSelect={handleNavSelect}>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/dashboard">Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/order">Order</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/prices">Accepted Price List</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/request">Send Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/check">Check Inserting</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='navitem'>
                            <Nav.Link className='navlink' eventKey="/trash">Trash</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='logout'>
                            <Nav.Link className='navlink' eventKey="/logout">Log Out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

{/*notifications */}
            <Offcanvas show={showNoti} onHide={handleCloseNoti} placement="end" className="mobcolor">
                
                <Offcanvas.Body>
                    <div>
                            <h5 id='noti-head'>Notification</h5>
                            <p className='navlink' id='noti-sec'><Notifications/></p>

                        </div>
                </Offcanvas.Body>
            </Offcanvas>

            <Container fluid className='cont-sec-main'>
                <Row fluid className="rowsize1">
                    <Col fluid className="rowcolor">
                        <div className='header'>
                        <p className="d-lg-none" onClick={handleShow}><MenuIcon id="menubutton"/></p>
                            <Image id='profile-img' src={Pro} roundedCircle />
                            <h3 id='header-name'>Name.PVT(Ltd.)</h3>
                       <p className="d-lg-none" onClick={handleShowNoti}><CircleNotificationsIcon id="notiButton"/></p>
                        </div>
                    </Col>
                </Row>
                <Row fluid className="rowsize2">
                    <Col fluid xs={2} className="rowcolor rowsize">
                        <Nav className='nav' variant="pills" activeKey={activeKey} onSelect={handleNavSelect}>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/dashboard">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/order">Order</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/prices">Accepted Price List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/request">Send Request</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/check">Check Inserting</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='navitem'>
                                <Nav.Link className='navlink' eventKey="/trash">Trash</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='logout'>
                                <Nav.Link className='navlink' eventKey="/logout">Log Out</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col fluid id='backgroundbodymain'></Col>
                    <Col fluid xs={2} className='noti-col'>
                        <div>
                            <h5 id='noti-head'>Notification</h5>
                            <p id='noti-sec'><Notifications/></p>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NavBarCom;
