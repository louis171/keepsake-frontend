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
import Carousel from "react-bootstrap/Carousel";

import { getExcerpt } from "../../helpers/helpers";

const DUMMY_DATA = [
  {
    deceasedId: "-sgbhQCqd_WOUn2l",
    deceasedForename: "David",
    deceasedMiddlename: "Kenneth",
    deceasedSurname: "Garcia",
    deceasedDateOfBirth: "1944-08-27",
    deceasedDateOfDeath: "2022-04-27",
    deceasedDetails:
      "In consequat ex at massa porta auctor. Quisque mollis rutrum magna a finibus. Nullam lacinia erat ac viverra porttitor. Sed pretium, magna nec eleifend ullamcorper, arcu elit ornare lectus, eu ultrices purus est a risus. Pellentesque sit amet lacus at augue maximus pellentesque. In accumsan lacus a pretium volutpat.",
    deceasedimage: [
      {
        deceasedImageId: "hFhqQXcW7HWiN97r",
        deceasedImagePath:
          "http://localhost:4000/public/hFhqQXcW7HWiN97r!pexels-andrea-piacquadio-3831612.jpg",
        deceasedImageName: "pexels-andrea-piacquadio-3831612.jpg",
      },
    ],
  },
  {
    deceasedId: "cS0a1SxoiX-8GIPL",
    deceasedForename: "Jules",
    deceasedMiddlename: "",
    deceasedSurname: "Kelly",
    deceasedDateOfBirth: "1966-04-23",
    deceasedDateOfDeath: "2022-05-18",
    deceasedDetails:
      "Sed vel augue turpis. Ut vitae congue enim. Nam scelerisque tincidunt tristique. Maecenas id nulla est. Fusce quam lorem, cursus sed bibendum a, vulputate nec elit. Sed porttitor sodales pulvinar. Pellentesque et blandit lorem. Vestibulum maximus vel libero at sagittis.",
    deceasedimage: [
      {
        deceasedImageId: "JvhsZpvsH3DP24Jd",
        deceasedImagePath:
          "http://localhost:4000/public/JvhsZpvsH3DP24Jd!avatar-67c27da1ff9f4f182bec46d9e933ff9c.jpg",
        deceasedImageName: "avatar-67c27da1ff9f4f182bec46d9e933ff9c.jpg",
      },
    ],
  },
  {
    deceasedId: "Ov2Db2_TzyZF6k_Q",
    deceasedForename: "Kevin",
    deceasedMiddlename: "Darcy",
    deceasedSurname: "Jones",
    deceasedDateOfBirth: "1973-11-13",
    deceasedDateOfDeath: "2022-05-08",
    deceasedDetails:
      "Praesent posuere felis non magna vehicula, vitae aliquam orci sodales. Aliquam erat volutpat. Aliquam erat volutpat. Suspendisse luctus pulvinar dui, cursus accumsan sapien iaculis nec. Donec vestibulum nisi ligula, convallis accumsan diam hendrerit non.",
    deceasedimage: [
      {
        deceasedImageId: "ScqOTA3dmDaQdohu",
        deceasedImagePath:
          "http://localhost:4000/public/ScqOTA3dmDaQdohu!avatar-d6946071babd8fc529587de417f4b03c.jpg",
        deceasedImageName: "avatar-d6946071babd8fc529587de417f4b03c.jpg",
      },
    ],
  },
];

const Home = () => {
  const [key, setKey] = useState("home");
  const navigate = useNavigate();
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
      <Row>
        <Col>
          <h1 className="text-center">Recent memories</h1>
          <Carousel variant="dark">
            {DUMMY_DATA.map((deceased) => (
              <Carousel.Item key={deceased.deceasedId}>
                <Card className="w-75 mx-auto border-0 mb-4">
                  <Image
                    className="mx-auto"
                    style={{
                      height: "12em",
                      width: "12em",
                      borderRadius: "999px",
                      backgroundImage: `url(${deceased.deceasedimage[0].deceasedImagePath})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></Image>
                  <Card.Body className="text-center">
                    <Card.Title>
                      {deceased.deceasedForename} {deceased.deceasedMiddlename}{" "}
                      {deceased.deceasedSurname}
                    </Card.Title>
                    <Card.Text>
                      {getExcerpt(deceased.deceasedDetails, 100).shortText}
                    </Card.Text>
                    <Button
                      onClick={() => navigate(`/memory/${deceased.deceasedId}`)}
                      variant="primary"
                    >
                      Visit memory page
                    </Button>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Home;
