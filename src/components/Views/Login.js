import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { AuthContext } from "../../auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    // Checks form validity. If false displays error toast
    if (form.checkValidity() === false) {
      toast.error("Error. Please enter login details");
      // If validity is true then starts auth procedure
    } else if (form.checkValidity() === true) {
      axios
        .post(
          "http://localhost:4000/auth/signin",
          {
            userEmail: userEmail,
            userPassword: userPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          // On successful POST sets user details to authContext
          setUser({
            userForename: res.data.user.userForename,
            userSurname: res.data.user.userSurname,
            userId: res.data.user.userId,
            auth: true,
          });
          res.status == 200 ? navigate("/profile") : navigate("/");
          // Displays sucess toast on res.status == 200
          if (res.status === 200) {
            toast.success("Login Successfull");
            // If any falsey status code then display error toast
          } else if (res.status >= 400) {
            toast.error("Error. Please try again");
          }
        })
        .catch((err) => {
          // if any axios error then assume incorrect login details
          toast.error("Error. Incorrect email or password");
        });
    }
  };

  return (
    <Container
      style={{ height: "calc(100vh - 72px)" }}
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
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-center"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button size="lg" variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <div
              onClick={() => navigate("/register")}
              className="text-center mt-2"
            >
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
