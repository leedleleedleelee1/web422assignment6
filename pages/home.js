/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ___Frank Fu___________________ Student ID: ____126609197____________ Date: ________Aug 2 2024____________
*
*  Vercel App (Deployed) Link: ______https://web422assignment6-nine.vercel.app/_
*
********************************************************************************/ 


import Image from 'react-bootstrap/Image';
import { Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { readToken } from '@/lib/authenticate';

const Home = () => {
  const token = readToken();

  if (token) {
    return (
      <>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
        <Row>
          <Col md={6}>
            <p>The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the United States. With 6,479,548 visitors to its three locations in 2019, it was the fourth most visited art museum in the world.</p>
          </Col>
          <Col md={6}>
            <p>Its permanent collection contains over two million works, divided among seventeen curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums.</p>
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Learn more</a>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
      <Row>
        <Col md={6}>
          <p>Welcome to our Metropolitan Museum of Art Explorer! This application allows you to dive deep into the vast collection of the Met, providing an interactive and engaging way to discover and explore artwork from around the world.</p>
          <p className="text-warning">Please log in to unlock full features and personalize your art exploration experience!</p>
          <Link href="/login" passHref>
            <Button variant="danger" className="mb-3">Log In Now</Button>
          </Link>
        </Col>
        <Col md={6}>
          <p>Browse through thousands of artworks, add your favorites to a personal collection, and track your exploration history. Whether you're an art enthusiast or a casual browser, our app makes discovering art simple, fun, and accessible.</p>
          <p className="text-warning">Create an account to save your favorite artworks and track your art journey!</p>
          <Link href="/register" passHref>
            <Button variant="outline-danger" className="mb-3">Register</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Home;
