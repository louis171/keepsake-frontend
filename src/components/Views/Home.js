import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  const [key, setKey] = useState("home");
  return (
    <Container fluid="lg" className="mt-4">
      <Row className="d-block h-100 d-md-flex mb-5">
        <Col className="h-100 m-auto mb-4 d-md-block">
          <Image
            className="rounded-pill w-100"
            src="https://images.pexels.com/photos/1807891/pexels-photo-1807891.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          ></Image>
        </Col>
        <Col className="h-100 my-auto">
          <h1 className="display-1">
            <span style={{ fontWeight: "bold" }}>Keep</span>sake
          </h1>
          <h2 className="display-6 text-end">A meaningful farewell</h2>
          <p className="lead text-center">
            Collect your loved ones memories from anyone, anywhere.
          </p>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="text-center">
          <div className="pb-4">
            <h2>Create your free memory page today!</h2>
            <p>Only 3 easy steps to create your lasting memorial</p>
          </div>
        </Col>
      </Row>
      <Row className="bg-light pb-4">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Col className="pb-2" sm={12} md={12} lg={6}>
            <Nav variant="pills" className="d-flex justify-content-center p-2">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="#334155" />
                    <path
                      d="M17.373 8.68359V23H14.2969V12.1602C14.1276 12.3099 13.9258 12.4531 13.6914 12.5898C13.4635 12.7201 13.2194 12.8405 12.959 12.9512C12.6986 13.0553 12.4284 13.1465 12.1484 13.2246C11.8685 13.2962 11.5918 13.3483 11.3184 13.3809V10.7832C12.1191 10.5488 12.8743 10.2493 13.584 9.88477C14.2936 9.52018 14.9349 9.11979 15.5078 8.68359H17.373Z"
                      fill="white"
                    />
                  </svg>
                </Nav.Link>
              </Nav.Item>
              <svg
                className="my-auto"
                width="70"
                height="10"
                viewBox="0 0 95 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M94.9999 5.99672L84.9995 0.223919L85.0003 11.7709L94.9999 5.99672ZM9.60263e-06 7.00343L2.96876 7.00322L2.96862 5.00322L-0.000131673 5.00343L9.60263e-06 7.00343ZM8.90626 7.0028L14.8438 7.00238L14.8436 5.00238L8.90612 5.0028L8.90626 7.0028ZM20.7813 7.00196L26.7188 7.00154L26.7186 5.00154L20.7811 5.00196L20.7813 7.00196ZM32.6563 7.00112L38.5938 7.0007L38.5936 5.0007L32.6561 5.00112L32.6563 7.00112ZM44.5313 7.00028L50.4688 6.99986L50.4686 4.99986L44.5311 5.00028L44.5313 7.00028ZM56.4063 6.99944L62.3438 6.99902L62.3436 4.99902L56.4061 4.99944L56.4063 6.99944ZM68.2813 6.9986L74.2188 6.99818L74.2186 4.99818L68.2811 4.9986L68.2813 6.9986ZM80.1563 6.99776L86.0938 6.99734L86.0936 4.99734L80.1561 4.99776L80.1563 6.99776Z"
                  fill="#334155"
                />
              </svg>

              <Nav.Item>
                <Nav.Link eventKey="second">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="#334155" />
                    <path
                      d="M13.4375 20.4414H19.375V23H10.0586V21.9453C10.0586 21.2292 10.179 20.5879 10.4199 20.0215C10.6608 19.4486 10.9635 18.9375 11.3281 18.4883C11.6927 18.0326 12.0898 17.6322 12.5195 17.2871C12.9557 16.9355 13.3691 16.6198 13.7598 16.3398C14.1699 16.0469 14.528 15.7669 14.834 15.5C15.1465 15.2331 15.4069 14.9694 15.6152 14.709C15.8301 14.4421 15.9896 14.1751 16.0938 13.9082C16.1979 13.6348 16.25 13.3451 16.25 13.0391C16.25 12.4401 16.0807 11.9876 15.7422 11.6816C15.4036 11.3757 14.8861 11.2227 14.1895 11.2227C12.985 11.2227 11.8327 11.7012 10.7324 12.6582V9.94336C11.9499 9.1556 13.3236 8.76172 14.8535 8.76172C15.5632 8.76172 16.1979 8.85612 16.7578 9.04492C17.3242 9.22721 17.8027 9.49089 18.1934 9.83594C18.584 10.181 18.8802 10.6009 19.082 11.0957C19.2904 11.584 19.3945 12.1309 19.3945 12.7363C19.3945 13.3809 19.2936 13.9538 19.0918 14.4551C18.8965 14.9564 18.6328 15.4121 18.3008 15.8223C17.9753 16.2324 17.5977 16.61 17.168 16.9551C16.7383 17.2936 16.2923 17.6224 15.8301 17.9414C15.5176 18.1628 15.2148 18.3841 14.9219 18.6055C14.6354 18.8203 14.3815 19.0352 14.1602 19.25C13.9388 19.4583 13.763 19.6634 13.6328 19.8652C13.5026 20.0671 13.4375 20.2591 13.4375 20.4414Z"
                      fill="white"
                    />
                  </svg>
                </Nav.Link>
              </Nav.Item>
              <svg
                className="my-auto"
                width="70"
                height="10"
                viewBox="0 0 95 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M94.9999 5.99672L84.9995 0.223919L85.0003 11.7709L94.9999 5.99672ZM9.60263e-06 7.00343L2.96876 7.00322L2.96862 5.00322L-0.000131673 5.00343L9.60263e-06 7.00343ZM8.90626 7.0028L14.8438 7.00238L14.8436 5.00238L8.90612 5.0028L8.90626 7.0028ZM20.7813 7.00196L26.7188 7.00154L26.7186 5.00154L20.7811 5.00196L20.7813 7.00196ZM32.6563 7.00112L38.5938 7.0007L38.5936 5.0007L32.6561 5.00112L32.6563 7.00112ZM44.5313 7.00028L50.4688 6.99986L50.4686 4.99986L44.5311 5.00028L44.5313 7.00028ZM56.4063 6.99944L62.3438 6.99902L62.3436 4.99902L56.4061 4.99944L56.4063 6.99944ZM68.2813 6.9986L74.2188 6.99818L74.2186 4.99818L68.2811 4.9986L68.2813 6.9986ZM80.1563 6.99776L86.0938 6.99734L86.0936 4.99734L80.1561 4.99776L80.1563 6.99776Z"
                  fill="#334155"
                />
              </svg>
              <Nav.Item>
                <Nav.Link eventKey="third">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="#334155" />
                    <path
                      d="M10.3906 22.541V19.8555C11.3281 20.5391 12.4219 20.8809 13.6719 20.8809C14.4596 20.8809 15.0716 20.7116 15.5078 20.373C15.9505 20.0345 16.1719 19.5625 16.1719 18.957C16.1719 18.332 15.8984 17.8503 15.3516 17.5117C14.8112 17.1732 14.0658 17.0039 13.1152 17.0039H11.8164V14.6406H13.0176C14.8405 14.6406 15.752 14.0352 15.752 12.8242C15.752 11.6849 15.0521 11.1152 13.6523 11.1152C12.7148 11.1152 11.8034 11.418 10.918 12.0234V9.50391C11.901 9.00911 13.0469 8.76172 14.3555 8.76172C15.7878 8.76172 16.901 9.08398 17.6953 9.72852C18.4961 10.373 18.8965 11.2096 18.8965 12.2383C18.8965 14.0677 17.9688 15.2135 16.1133 15.6758V15.7246C17.1029 15.8483 17.8841 16.2096 18.457 16.8086C19.0299 17.401 19.3164 18.1302 19.3164 18.9961C19.3164 20.3047 18.8379 21.3398 17.8809 22.1016C16.9238 22.8633 15.6022 23.2441 13.916 23.2441C12.4707 23.2441 11.2956 23.0098 10.3906 22.541Z"
                      fill="white"
                    />
                  </svg>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="text-center" sm={12} md={12} lg={6}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Card className="border-0">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/1812526/pexels-photo-1812526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <Card.Body>
                    <Card.Title>Step 1</Card.Title>
                    <Card.Text>
                      Gather your loved ones most cherished memories and loving
                      condolences
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Card className="border-0">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/1812526/pexels-photo-1812526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <Card.Body>
                    <Card.Title>Step 2</Card.Title>
                    <Card.Text>
                      Share the weblink with your family, friends and anyone
                      else who wishes to share their memories
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Card className="border-0">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/1812526/pexels-photo-1812526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <Card.Body>
                    <Card.Title>Step 3</Card.Title>
                    <Card.Text>
                      Have a lasting and intimate keepsake forever
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
      <Row className="mt-4 bg-white">
        <Col className="d-flex justify-content-center">
          <Button className="mx-4" variant="primary">Register</Button>
          <Button className="mx-4" variant="outline-primary">Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
