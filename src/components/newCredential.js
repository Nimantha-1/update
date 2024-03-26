import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import newcredential from '../assets/newcredential.png';
import "./login.css";
import { Link } from 'react-router-dom';



function newCredential () {
  return (
    <>
     <Row className='black'>
      <Col fluid>
      </Col>
    </Row>
    <Form className='formWrapper'>
          <img className='imglog' src={newcredential} alt="logo"/>
          <p className='class1'> NEW <br /><span className='span2'>CREDENTIALS</span></p>
          <br />
      
      <Form.Group className="mb-3" controlId="formBasicnewPassword">
        <Form.Control type="password" placeholder="New Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicconfirmPassword">
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <br />
      <br />
      <Link to="/passwordUpdate">
      <Button className="btnlog" variant="primary" type="submit">
        UPDATE
      </Button></Link>
      <br />
      <br />
    </Form>
    </>
  );
}

export default newCredential;