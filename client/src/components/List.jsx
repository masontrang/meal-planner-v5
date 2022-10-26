import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function List(props) {
  const [items, setItems] = useState(['', '', '']);

  function addItem(event, i) {
    event.preventDefault();
    const itemsCopy = items.slice();
    itemsCopy.splice(i + 1, 0, '');
    setItems(itemsCopy);
  }

  function deleteItem(event, i) {
    event.preventDefault();
    const itemsCopy = items.slice();
    if (items.length > 1) {
      itemsCopy.splice(i, 1);
      setItems(itemsCopy);
    }
  }

  function handleChange(event, index) {
    event.preventDefault();
    const itemsCopy = items.slice();
    itemsCopy[index] = event.target.value;
    setItems(itemsCopy);
  }

  return (
    <Container>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Form.Label>{props.title}</Form.Label>
        </Row>

        <Row></Row>

        <ol>
          {items.map((item, i) => {
            return (
              <Row xs={1} className="mb-1">
                <Col xs={1} className="m-0">
                  {props.title === 'Directions' && (
                    <p className="m-1">Step {i + 1} </p>
                  )}
                  {props.title === 'Ingredients' && (
                    <p className="m-1">Item {i + 1} </p>
                  )}
                </Col>
                <Col xs={7}>
                  <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter details" />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Button
                    className="mx-1"
                    // className="list-button"
                    onClick={(e) => {
                      deleteItem(e, i);
                    }}
                  >
                    -
                  </Button>
                  <Button
                    // className="me"
                    // className="list-button"
                    onClick={(e) => {
                      addItem(e, i);
                    }}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            );
          })}
        </ol>
      </Form.Group>
    </Container>
  );
}

export default List;
