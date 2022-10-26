import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Collaborate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <h2>Collaborate</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Group Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Group Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Join Code</Form.Label>
          <Form.Control type="text" placeholder="Enter Join Code" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleShow}>
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Group Joined!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you have joined group name!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Collaborate;
