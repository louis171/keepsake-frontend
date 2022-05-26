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

import { getExcerpt } from "../../helpers/getExerpt";

const DUMMY_DATA = [
  {
    deceasedId: "ncoW3hs9AmhjFddr",
    deceasedForename: "Phil",
    deceasedMiddlename: "Hubert",
    deceasedSurname: "Davidson",
    deceasedDateOfBirth: "1986-04-23",
    deceasedDateOfDeath: "2022-05-08",
    deceasedDetails:
      "Sed vel augue turpis. Ut vitae congue enim. Nam scelerisque tincidunt tristique. Maecenas id nulla est. Fusce quam lorem, cursus sed bibendum a, vulputate nec elit. Sed porttitor sodales pulvinar. Pellentesque et blandit lorem. Vestibulum maximus vel libero at sagittis.",
    deceasedimage: [
      {
        deceasedImageId: "tvfzX8eCrzeCq0EZ",
        deceasedImagePath:
          "http://localhost:4000/public/29crdsvOwd1uryyZ!avatar-d6946071babd8fc529587de417f4b03c.jpg",
        deceasedImageName: "avatar-67c27da1ff9f4f182bec46d9e933ff9c.jpg",
      },
    ],
  },
  {
    deceasedId: "rwd4Do0cWTujCnju",
    deceasedForename: "Jerry",
    deceasedMiddlename: "",
    deceasedSurname: "Johnson",
    deceasedDateOfBirth: "1944-11-03",
    deceasedDateOfDeath: "2022-04-18",
    deceasedDetails:
      "Aenean justo orci, ullamcorper at congue ut, feugiat ut augue. Nam magna eros, rhoncus sit amet interdum ac, pretium et massa. Vivamus nec magna justo. Curabitur a nunc nec orci cursus fermentum elementum et mauris. Vestibulum eu pellentesque dolor.",
    deceasedimage: [
      {
        deceasedImageId: "29crdsvOwd1uryyZ",
        deceasedImagePath:
          "http://localhost:4000/public/tvfzX8eCrzeCq0EZ!avatar-67c27da1ff9f4f182bec46d9e933ff9c.jpg",
        deceasedImageName: "avatar-d6946071babd8fc529587de417f4b03c.jpg",
      },
    ],
  },
  {
    deceasedId: "rwd4Do0cWTujCnku",
    deceasedForename: "David",
    deceasedMiddlename: "",
    deceasedSurname: "Jackson",
    deceasedDateOfBirth: "1976-04-23",
    deceasedDateOfDeath: "2022-04-25",
    deceasedDetails:
      "Quisque mollis pellentesque dictum. Sed ex odio, ultrices eget enim eget, mattis cursus risus. Mauris consectetur ipsum id ultrices viverra. Nunc mollis luctus leo a efficitur. Morbi ligula lectus, consequat fringilla placerat ac, eleifend id metus. Fusce euismod urna ac lacinia mattis. Nulla convallis massa nec nisl posuere congue. Nulla eu venenatis mauris, id luctus ante. Pellentesque ut orci ac leo congue ultricies id vitae est.",
    deceasedimage: [
      {
        deceasedImageId: "3cW7akYoYLOohA_V",
        deceasedImagePath:
          "http://localhost:4000/public/3cW7akYoYLOohA_V!pexels-andrea-piacquadio-3831612.jpg",
        deceasedImageName: "pexels-andrea-piacquadio-3831612.jpg",
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
                      onClick={() => navigate("/deceased:ncoW3hs9AmhjFddr", { replace: true })}
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
