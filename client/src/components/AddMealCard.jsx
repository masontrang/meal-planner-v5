import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AddMealCard() {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Button variant="primary" >Add Meal</Button>
      </Card.Body>
    </Card>
  );
}

export default AddMealCard;
