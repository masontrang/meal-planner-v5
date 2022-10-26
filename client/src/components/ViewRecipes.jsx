import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeCard from './RecipeCard';
import ViewRecipe from './ViewRecipe';
import Accordion from 'react-bootstrap/Accordion';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import { useState } from 'react';

function ViewRecipes() {
  const [checked, setChecked] = useState(false);
  const categories = [
    { name: 'Favorites', checked: false },
    { name: 'Beef', checked: false },
    { name: 'Chicken', checked: false },
    { name: 'Pork', checked: false },
    { name: 'Vegetarian', checked: false },
  ];

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid>
      <h2>View Recipes</h2>

      <Row>
        <Accordion defaultActiveKey flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Sort</Accordion.Header>
            <Accordion.Body>
              <ToggleButton
                className="me-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value="value"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Date Added
              </ToggleButton>{' '}
              <ToggleButton
                className="me-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value="value"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Frequency
              </ToggleButton>
              <ToggleButton
                className="me-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value="value"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Recently Prepared
              </ToggleButton>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Filter</Accordion.Header>
            <Accordion.Body>
              {categories.map((category) => {
                return (
                  <ToggleButton
                    className="me-2"
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={category.checked}
                    value={category.name}
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  >
                    {category.name}
                  </ToggleButton>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Pagination>{items}</Pagination>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
      </Row>
    </Container>
  );
}

export default ViewRecipes;
