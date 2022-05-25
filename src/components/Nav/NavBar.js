import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  const [show, setShow] = useState(false);

  // Toggles OffCanvas. Used by links to close when a menu option is clicked
  const toggleOffCanvasHandler = () => {
    setShow((prevShowMenu) => !prevShowMenu);
  };

  return (
    <Navbar bg="light" expand="false" className="mb-3">
      <Container fluid="lg">
        <Navbar.Brand>
          <LinkContainer style={{ cursor: "pointer" }} to="/">
            <div>
              <svg
                width="26"
                height="23"
                viewBox="0 0 26 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.74959 22.3683C2.26431 21.425 1.58256 20.56 0.690771 18.487C-0.413939 15.9192 -0.170913 11.8796 1.24973 9.19586C3.33902 5.24902 8.02864 1.91449 13.4942 0.489437C16.1387 -0.20005 24.2883 -0.148158 24.9777 0.562579C25.2838 0.878066 25.0907 1.52983 24.2029 3.17759L23.0204 5.37231L18.9104 5.33172C14.4884 5.28795 12.0001 5.74655 9.08346 7.14258C3.64566 9.74554 1.07847 15.2668 3.18258 19.8342C3.57949 20.6958 4.16973 21.7719 4.49422 22.2255C5.20915 23.2248 5.12399 23.2411 3.74958 22.3682L3.74959 22.3683ZM5.70874 22.3157C2.02112 18.5241 4.3679 11.8003 10.1874 9.484C11.9167 8.79566 13.0372 8.63472 16.2953 8.60679C21.2182 8.56454 21.4782 8.74296 20.1508 11.2505L19.1837 13.0774L15.2097 13.2246C11.7616 13.3523 10.9922 13.5015 9.39544 14.3524C6.33365 15.984 5.24246 18.3453 6.21253 21.2402C6.85154 23.1472 6.74291 23.3791 5.70867 22.3157L5.70874 22.3157ZM7.93829 22.264C7.69321 22.0111 7.49268 21.0786 7.49268 20.1919C7.49268 17.3213 10.077 15.7199 14.7091 15.7199C17.407 15.7199 18.1288 16.2185 17.2655 17.4859C16.7941 18.1778 16.3857 18.2856 14.2341 18.2856C11.7248 18.2856 9.6061 18.9044 9.07175 19.7934C8.91204 20.0592 8.69194 20.8272 8.58264 21.5003C8.42347 22.4803 8.2952 22.6324 7.93831 22.2641L7.93829 22.264Z"
                  fill="black"
                />
              </svg>
              Keepsake
            </div>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={toggleOffCanvasHandler}
          aria-controls="offcanvasNavbar-expand-md"
        />
        <Navbar.Offcanvas
          show={show}
          onHide={toggleOffCanvasHandler}
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 text-center">
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4 border rounded"
                to="/"
              >
                <Button
                  id="offcanvasNavbar-expand-md"
                  size="lg"
                  variant="outline-link"
                >
                  Home
                </Button>
              </LinkContainer>
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4 border rounded"
                to="/about"
              >
                <Button size="lg" variant="outline-link">
                  About
                </Button>
              </LinkContainer>
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4"
                to="/login"
              >
                <Button size="lg" variant="primary">
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4"
                to="/register"
              >
                <Button size="lg" variant="outline-primary">
                  Register
                </Button>
              </LinkContainer>
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4"
                to="/profile"
              >
                <Button size="lg" variant="primary">
                  My profile
                </Button>
              </LinkContainer>
              <LinkContainer
                onClick={toggleOffCanvasHandler}
                className="mb-4"
                to="/logout"
              >
                <Button size="lg" variant="outline-primary">
                  Logout
                </Button>
              </LinkContainer>

              <NavDropdown
                title="Dropdown"
                id="offcanvasNavbarDropdown-expand-md"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
