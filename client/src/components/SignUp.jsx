import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function SignUp() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitRegisterUser({
      user: username,
      password,
      confirmPassword,
    });
  };

  async function submitRegisterUser(body) {
    console.log('body', body);
    const res = await fetch('/api/users/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    // props.setMessage(json.message);

    if (res.ok) {
      // getUser();
      // props.setOptionSelection('users');
    }
    // setMessage(json.message);
    throw json;
  }
  return (
    <Container>
      <Form>
        <h2 className="mb-3">Sign Up</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
          name="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingConfirmPassword"
          label="ConfirmPassword"
          className="mb-3"
          name="confirmPassword"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        >
          <Form.Control type="password" placeholder="Confirm Password" />
        </FloatingLabel>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
