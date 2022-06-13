import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [userForename, setUserForename] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    // Checks form validity. If false displays error toast
    if (form.checkValidity() === false) {
      toast.error("Error. Please enter registration details");
      // If validity is true then starts auth procedure
    } else if (form.checkValidity() === true) {
      setValidated(true);
      axios
        .post("http://localhost:4000/auth/signup", {
          userForename: userForename,
          userSurname: userSurname,
          userEmail: userEmail,
          userPassword: userPassword,
        })
        .then((res) => {
          // Displays sucess toast on res.status == 201
          if (res.status === 201) {
            toast.success("Login Successfull");
            // If any falsey status code then display error toast
          } else if (res.status >= 400) {
            toast.error("Error. Please try again");
          }
          res.status === 201 ? navigate("/login") : navigate("/register");
        })
        .catch((err) => {
          // if any axios error then assume email is already in use
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <Container
      style={{ height: "calc(100vh - 72px)" }}
      fluid="lg"
      className="d-flex w-100 justify-content-center align-items-center"
    >
      <ToastContainer autoClose={3000} />
      <Row className="w-100">
        <Col sm={12} md={12} lg={6} className="m-lg-auto">
          <Form
            noValidate
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
