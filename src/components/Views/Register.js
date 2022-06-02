import React, { useState } from "react";
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

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [userForename, setUserForename] = useState("");
  const [userSurname, setUserSurname] = useState("");
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
      axios
        .post("http://localhost:4000/auth/signup", {
          userForename: userForename,
          userSurname: userSurname,
          userEmail: userEmail,
          userPassword: userPassword,
        })
        .then((res) => {
          res.status == 201 ? navigate("/login") : navigate("/register");
        });
    }
  };

  return (
    <Container
      style={{ height: "calc(100% - 72px)" }}
      fluid="lg"
      className="position-fixed d-flex w-100 justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col className="w-100">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="bg-light p-2 border shadow-sm"
          >
            <h1 className="text-center">Register</h1>
            <Form.Group className="mb-3" controlId="formForename">
              <FloatingLabel controlId="inputForename" label="First Name">
                <Form.Control
                  onChange={(e) => setUserForename(e.target.value)}
                  required
                  type="text"
                  placeholder="First name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSurname">
              <FloatingLabel controlId="inputSurname" label="Last Name">
                <Form.Control
                  onChange={(e) => setUserSurname(e.target.value)}
                  required
                  type="text"
                  placeholder="Last name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="inputEmail" label="Email address">
                <Form.Control
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="name@example.com"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="inputPassword" label="Password">
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
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button size="lg" variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <div
              onClick={() => navigate("/login")}
              className="text-center mt-2"
            >
              <p className="m-0 p-0 text-muted">
                Already have an account?{" "}
                <span className="text-decoration-underline text-primary">
                  Login
                </span>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
