import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginLogo from '../assets/loginLogo.png';
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from 'react';
import { auth,app } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');


  const signIn = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up
    navigate("/dashboard");
    //console.log(userCredential);
    // ...
  })
  .catch((error) => {
    console.log(error);
    // ..
  });

  }

  const handleReset = ()=>{
    navigate("/forgotPassword");
  }

  return (
    <>
     <Row className='black'>
      <Col fluid>
      </Col>
    </Row>
    <Form className='formWrapper' onSubmit={signIn}>
          <img className='imglog' src={loginLogo} alt="logo"/>
          <p>Login Here...</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicCheckbox">
      <p className='reg' onClick={handleReset}>Forgot Password?</p>
      </Form.Group>
      <Button className="btnlog" variant="primary" type="submit">
        LOGIN
      </Button>
      <br />
      <br />
      <Link to="/createLog" className='reg'>Register Here</Link>
    </Form>
    </>
  );
}

export default Login;