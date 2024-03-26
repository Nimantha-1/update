import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from 'react';
import { auth,app } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import create from '../assets/create.png';


function CreateLog() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const signUp = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    navigate("/login");
    //console.log(userCredential);
    // ...
  })
  .catch((error) => {
    console.log(error);
    // ..
  });

  }

  return (
    <>
     <Row className='black'>
      <Col fluid>
      </Col>
    </Row>
    <Form className='formWrapper' onSubmit={signUp}>
          <img className='imglog' src={create} alt="logo"/> 
          <p><span>Create</span> Account</p>
      <Form.Group className="mb-3" controlId="formBasicuserName">
        <Form.Control type="text" placeholder="User Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicrePassword">
        <Form.Control type="password" placeholder="Re-Enter Password" />
      </Form.Group>

      <Button className="btnlog" variant="primary" type="submit">
        REGISTER
      </Button>
      <br />
      <br />
      <Link to="/login" className='reg'>Login Here</Link>
    </Form>
    </>
  );
}

export default CreateLog;