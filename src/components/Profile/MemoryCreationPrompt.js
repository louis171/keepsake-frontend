import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MemoryCreationPrompt = () => {
  return (
    <Container fluid="lg" className="h-100 w-100 mt-4 text-center">
      <Row className="my-4">
        <Col>
          <h1>No Keepsakes found</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default MemoryCreationPrompt;
