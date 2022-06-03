import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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
    <Container
      style={{ height: "calc(100vh - 72px)" }}
      className="d-flex w-100 justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col sm={12} md={12} lg={6} className="m-lg-auto">
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
                  value={userEmail}
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
                  value={userPassword}
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
            <div onClick={() => navigate('/register')} className="text-center mt-2">
              <p className="m-0 p-0 text-muted">
                Don't have an account?{" "}
                <span className="text-decoration-underline text-primary">
                  Register
                </span>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
