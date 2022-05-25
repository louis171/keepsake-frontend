import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <Container fluid="lg" className="mt-4">
      <Row className="">
        <Col>
          <Image src="https://via.placeholder.com/500"></Image>
        </Col>
        <Col>
          <h1 className="display-1">Keepsake</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
