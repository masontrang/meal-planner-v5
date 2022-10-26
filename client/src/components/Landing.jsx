import { Container, Card, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Landing.css';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap';

function Landing() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Container className="Landing" fluid>
      <Row className="mb-3" style={{ textAlign: 'center' }}>
        <h1></h1>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval="10000"
          style={{
            width: '100vw',
          }}
        >
          <Carousel.Item>
            <Image
              style={{ height: '40vh' }}
              fluid
              rounded="true"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/birria-tacos-1648842127.jpg?crop=1.00xw:0.752xh;0,0.166xh&resize=768:*"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Yummy Tacos</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              fluid
              style={{ height: '40vh' }}
              rounded="true"
              className="w-30"
              src="https://hot-thai-kitchen.com/wp-content/uploads/2021/10/Untitled-design-5.jpg"
              alt="First slide"
            />

            <Carousel.Caption>
              <h3>Yummy Pad Thai</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              fluid
              style={{ height: '40vh' }}
              rounded="true"
              className="w-30"
              src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2005%2F06%2F22%2Fclassic-burgers-u.jpg"
              alt="First slide"
            />

            <Carousel.Caption>
              <h3>Yummy Burgers</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      <Row className="mb-3">
        <Col>
          <Card className="mb-2">
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title>Meal planning that works for you</Card.Title>
              <Card.Text>
                Reduce the worries of daily meal planning by choosing from
                favorite recipes in your collection
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row
        breakpoints="['lg', 'md', 'sm', 'xs']"
        className="mb-3"
        style={{ textAlign: 'center' }}
      >
        <Col>
          <Card className="m-2">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Organize Recipes</Card.Title>
              <Card.Text>
                Store recipes in your personal recipe collection and modify them
                as you please
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="m-2">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Create Meal Plans</Card.Title>
              <Card.Text>
                Choose from your favorite meals to create healthy and exciting
                plans
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="m-2">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Collaborate</Card.Title>
              <Card.Text>
                Share your favorite recipes and meal plans with the ones you
                love
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row> </Row>
    </Container>
  );
}

export default Landing;
