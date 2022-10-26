import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RecipeCard() {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Recipe Title</Card.Title>
        <Card.Text>This is the recipe description</Card.Text>
        <Button variant="primary" href="viewrecipe">
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
