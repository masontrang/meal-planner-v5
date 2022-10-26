import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MealCard() {
  return (
    // className="me-2"
    <Card style={{ width: '9rem', height: '9rem', margin: '8px' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Meal Title</Card.Title>
        {/* <Card.Text>This is the meal description</Card.Text> */}
        <Button variant="primary" size="sm">
          View Meal
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MealCard;
