import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Carousel from "react-bootstrap/Carousel";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { AuthContext } from "../../auth/AuthContext";

const Logout = () => {
  const { userSignOutHandler } = useContext(AuthContext);

  return (
    <Container
      style={{ marginTop: "-56px" }}
      fluid="lg"
      className="position-fixed d-flex w-100 h-100 justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col className="w-100">
          <Card className="text-center">
            <Card.Title>Are you sure you want to logout?</Card.Title>
            <Card.Body>
              <Button onClick={userSignOutHandler}>Logout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
