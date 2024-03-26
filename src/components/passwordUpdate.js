import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import done from '../assets/done1.webp';
import "./login.css";
import { Link } from 'react-router-dom';



function passwordUpdate () {
  return (
    <>
     <Row className='black'>
      <Col fluid>
      </Col>
    </Row>
    <Form className='formWrapper'>
        <br />
        <br />
          <p className='class2'> PASSWORD <br /><span className='span3'>UPDATE</span></p>
          <br />
          <img className='imglog' src={done} alt="logo"/>
      <br />
      <br />
      <Link to="/dashboard">
      <Button className="btnlog" variant="primary" type="submit">
        LOGIN
      </Button></Link>
      <br />
      <br />
    </Form>
    </>
  );
}

export default passwordUpdate;