import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import password from '../assets/password.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';

function ForgotPassword() {
  
  const navigate = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(auth, emailVal)
      .then(() => {
        alert("Check your email for password reset");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("Please try again");
      });
  }

  return (
    <>
      <Row className='black'>
        <Col fluid>
        </Col>
      </Row>
      <Form className='formWrapper' onSubmit={handleSubmit}>
        <img className='imglog' src={password} alt="logo" />
        <p className='class1'>FORGOT <br /><span className='span2'>PASSWORD</span></p>
        <br />
        <br />
        <div className="wrapper">
          <Form.Group className="mb-3">
            <div className="icon1"><EmailOutlinedIcon /></div>
            <Form.Control name="email" type="email" className='input' placeholder="Enter email" />
          </Form.Group>
        </div>
        <br />
        <br />
        <Button className="btnlog" variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </>
  );
}

export default ForgotPassword;
