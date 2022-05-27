import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { AuthContext } from "../../auth/AuthContext";

const Login = () => {
  const { userSigninHandler } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      userSigninHandler({ userEmail, userPassword });
    }
  };

  return (
    <Row className="h-100">
      <Col className="m-auto">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="bg-light p-2 border shadow-sm"
        >
          <h1 className="text-center">Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                onChange={(e) => setUserPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-center"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
