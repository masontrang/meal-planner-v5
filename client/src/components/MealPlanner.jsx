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
      startDate = moment().add(i + selection, 'd');
      array.push(startDate);
    }
    setDateArray(array);
  };

  const getMeals = async (body) => {
    // const response = await fetch('/api/meals/getMeals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    // const json = await response.json();

    setMeals([
      {
        _id: { $oid: '633cb21361c8c808d9abb718' },
        date: { $date: { $numberLong: '1664842928800' } },
        breakfast: [{ $oid: '63119e8b8ac54d9be212f43b' }],
        lunch: [],
        dinner: [],
        user: { $oid: '63119b3773372d0f1a550986' },
        __v: { $numberInt: '0' },
      },
    ]);
  };

  useEffect(() => {
    getDateArray();
  }, [selection]);
  useEffect(() => {
    getMeals();
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
