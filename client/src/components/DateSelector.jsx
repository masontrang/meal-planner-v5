import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './DateSelector.css';
import moment from 'moment';
moment().format();

function DateSelector(props) {
  // var startDate = moment();
  // const [dateArray, setDateArray] = useState([]);
  // const [selection, setSelection] = useState(0);
  // const getArray = () => {
  //   const array = [];
  //   for (let i = 0; i < 7; i++) {
  //     startDate = moment().add(i + selection, 'd');
  //     array.push(startDate.format('MMM D YY'));
  //   }
  //   setDateArray(array);
  // };

  // useEffect(() => {
  //   getArray();
  // }, [selection]);

  return (
    <>
      <Container className="DateSelector" fluid>
        <ButtonToolbar>
          <ButtonGroup size="sm" className="me-2">
            <Button
              className="date-nav-button"
              onClick={() => {
                props.setSelection(0);
              }}
            >
              Today
            </Button>
            <Button
              className="date-nav-button"
              variant="secondary"
              onClick={() => {
                props.setSelection(props.selection - 1);
              }}
            >
              ←
            </Button>
            {props.dateArray.map((date, index) => (
              <Button
                variant="light"
                className="date-button"
                onClick={() => {
                  props.setSelection(props.selection + index);
                }}
              >
                {date.format('MMM DD')}
              </Button>
            ))}
            <Button
              variant="secondary"
              className="date-nav-button"
              onClick={() => {
                props.setSelection(props.selection + 1);
              }}
            >
              →
            </Button>
          </ButtonGroup>
          {/* <ButtonGroup size="md" className="me-1">
              <Button variant="secondary">Forward</Button>
            </ButtonGroup> */}
        </ButtonToolbar>
      </Container>
    </>
    // <Nav variant="pills" defaultActiveKey="/home">
    //   <Nav.Item>
    //     <Nav.Link href="/meals/today">Today</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link href="/meals/today">Back</Nav.Link>
    //   </Nav.Item>
    //   {dates.map((date) => (
    //     <Nav.Item>
    //       <Nav.Link href={`/meals/${date}`}>{date}</Nav.Link>
    //     </Nav.Item>
    //   ))}
    //   <Nav.Item>
    //     <Nav.Link href="/meals/today">Forward</Nav.Link>
    //   </Nav.Item>
    // </Nav>
  );
}

export default DateSelector;
