import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MealCard(props) {
  return (
    // className="me-2"
    <Card style={{ width: '9rem', height: '9rem', margin: '4px' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Meal Title</Card.Title>
        {/* <Card.Text>This is the meal description</Card.Text> */}
        <Button variant="primary" size="sm" onClick={props.handleShow}>
          View Meal
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MealCard;
