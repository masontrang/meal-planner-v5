import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import List from './List';
import InputGroup from 'react-bootstrap/InputGroup';
import CloseButton from 'react-bootstrap/CloseButton';

function ViewMeal() {
  return (
    <Container>
      <Form>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Recipe Name" />
            </Form.Group>
          </Col>
          <Col xs={1}>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Favorite</Form.Label>
              <Form.Check type="checkbox" className="me-5" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={1.5}>
            <Form.Label>Yield</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipe Yield"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Form.Select aria-label="Default select example">
                <option>Measurement</option>
                <option value="1">Servings</option>
                <option value="2">Cups</option>
                <option value="3">Other</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col xs={1.5}>
            <Form.Label>Prep Time</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Text>hours</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
          </Col>

          <Col xs={1.5}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cook Time</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Text>hours</InputGroup.Text>
                <Form.Control aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Text>minutes</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <List title="Ingredients"></List>
        </Row>
        <Row>
          <List title="Directions"></List>
        </Row>
        <Row>
          <Col>
            {' '}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" placeholder="Enter Photo" />
            </Form.Group>
          </Col>{' '}
          <Col>
            {' '}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Recipe URL</Form.Label>
              <Form.Control type="text" placeholder="Enter Recipe URL" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Recipe Notes"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ViewMeal;
