import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState, useContext } from 'react';
import MealCard from './MealCard';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DateSelector from './DateSelector';
import AddMealCard from './AddMealCard';
import Accordion from 'react-bootstrap/Accordion';
import { DetailsContext } from '../App';
import './MealPlanner.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import ViewMeal from './ViewMeal';
moment().format();

function MealPlanner() {
  const { user, group, meals, setMeals } = useContext(DetailsContext);
  var startDate = moment();
  const [dateArray, setDateArray] = useState([]);
  const [selection, setSelection] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDateArray = () => {
    const array = [];
    for (let i = 0; i < 7; i++) {
      let date = moment().add(i + selection, 'd');
      array.push(date);
      console.log('date', date);
    }
    setDateArray(array);
  };

  const getMeals = async (body) => {
    const response = await fetch('/api/meals/getMeals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.ok) {
      const allMealsArray = [];
      for (let i = 0; i < 7; i++) {
        let nextDate = moment().add(i, 'd');
        // nextDate.setDate(startDate.getDate() + i);
        // nextDate.setUTCHours(0);
        // nextDate = nextDate.toISOString();
        console.log('next', nextDate);

        const found = json.find((date) => date.date == nextDate);
        if (found) {
          allMealsArray.push(found);
          console.log('found', found);
        } else {
          allMealsArray.push({
            _id: '',
            date: nextDate,
            breakfast: [],
            lunch: [],
            dinner: [],
          });
        }
      }
      setMeals(allMealsArray);
    }
    return json;
  };

  function loadMeals(startDate) {
    const body = { startDate: startDate };
    return getMeals(body);
  }

  useEffect(() => {
    getDateArray();
    loadMeals(startDate);
  }, [selection]);

  useEffect(() => {
    loadMeals(startDate);
  }, []);

  return (
    <Container fluid>
      <Row className="mb-3">
        <DateSelector
          // className="DateSelector"
          // style={{ height: 400 }}
          dateArray={dateArray}
          setSelection={setSelection}
          selection={selection}
        ></DateSelector>
      </Row>
      <Row>
        {dateArray.map((date, index) => {
          return (
            <Accordion defaultActiveKey={index}>
              <Accordion.Item eventKey={index} className="mb-1">
                <Accordion.Header className="p-0">
                  <b>{date.format('MMM D YYYY')}</b>
                </Accordion.Header>
                <Accordion.Body>
                  {meals.map((meal) => {
                    return (
                      <Container fluid>
                        <Row className="p-0">
                          <Col>
                            <h4>Breakfast</h4>

                            <Row className="p-0 m-0">
                              <MealCard handleShow={handleShow} />
                            </Row>
                          </Col>
                          <Col>
                            <h4>Lunch</h4>
                            <Row className="p-0 m-0">
                              <MealCard handleShow={handleShow} />
                              <MealCard handleShow={handleShow} />
                            </Row>
                          </Col>
                          <Col>
                            <h4>Dinner</h4>
                            <Row className="p-0 m-0">
                              <MealCard handleShow={handleShow} />
                              <MealCard handleShow={handleShow} />
                              <MealCard handleShow={handleShow} />
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
                  {/* <Col>
                          <MealCard></MealCard>
                          <MealCard></MealCard>
                          <MealCard></MealCard>
                          <AddMealCard></AddMealCard>
                        </Col>
                        <Col>
                          <MealCard></MealCard>
                          <MealCard></MealCard>
                          <AddMealCard></AddMealCard>
                        </Col>
                        <Col>
                          <MealCard></MealCard>
                          <MealCard></MealCard>
                          <MealCard></MealCard>
                          <AddMealCard></AddMealCard>
                        </Col> */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </Row>
      <Modal size="lg" show={show} onHide={handleClose} fullscreen="true">
        <Modal.Header closeButton>
          <Modal.Title>Recipe Title</Modal.Title>
        </Modal.Header>
        <ViewMeal />
      </Modal>
    </Container>
  );
}

export default MealPlanner;
