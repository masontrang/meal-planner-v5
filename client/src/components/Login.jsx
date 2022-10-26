import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import { DetailsContext } from '../App';
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, group, setUser, setGroup } = useContext(DetailsContext);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      await submitLoginUser({
        user: username,
        password,
      });
      // localStorage.setItem('loggedIn', true);
      // window.dispatchEvent(new Event('loggedIn'));
      // navigate('/redirect');

      getUser();
      navigate('/mealplanner');
    } catch (error) {
      // do something with error(s)
    }
  }

  const getUser = async (body) => {
    const response = await fetch('/api/users/user');
    const json = await response.json();
    // console.log('getuser', json);
    // json.user - username
    // json.group.groupName - groupName
    localStorage.setItem('user', json.user);
    await setUser(json.user);
    const saveGroup = (json) => {
      localStorage.setItem('group', json.group.groupName);
      setGroup(json.group.groupName);
    };
    {
      json.group && saveGroup(json);
    }

    return json.user;
  };

  async function submitLoginUser(body) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    // console.log('json', json);
    // console.log('res.status', res.status);
    // console.log('res.token', json.token);
    setMessage(json.message);

    if (res.ok) {
      // localStorage.setItem('loggedIn', true);

      return true;
    }
    throw json;
  }

  return (
    <Container>
      <h2 className="mb-3">Login</h2>
      {message}
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FloatingLabel>

        <Button variant="primary" type="submit" onClick={loginUser}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
