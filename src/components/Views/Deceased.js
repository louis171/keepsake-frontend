import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const Deceased = () => {
  const [deceasedData, setDeceasedData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  let { deceasedId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/deceased/?deceasedId=${deceasedId}`,
    }).then((response) => {
      setDeceasedData(response.data);
    });
    axios({
      method: "get",
      url: `http://localhost:4000/memory/?deceasedId=${deceasedId}`,
    }).then((response) => {
      setMemoryData(response.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={6} className="d-flex mx-auto">
          {deceasedData.map((deceased) => (
            <Card
              key={deceased.deceasedId}
              className="w-100 mx-auto border p-2 bg-light shadow-sm mb-4"
            >
              <Image
                fluid
                rounded
                src={deceased.deceasedimage[0].deceasedImagePath}
                className="mx-auto w-75"
              ></Image>
              <Card.Body className="text-center">
                <Card.Title>
                  {deceased.deceasedForename} {deceased.deceasedMiddlename}{" "}
                  {deceased.deceasedSurname}
                </Card.Title>
                <Card.Text>{deceased.deceasedDetails}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1>Memories</h1>
          <Button>Add Memory</Button>
        </Col>
      </Row>
      <Row>
        {memoryData.map((memory) => (
          <Col sm={12} md={12} lg={4} className="d-flex align-content-stretch">
            <div
              style={{ borderRadius: "2em 2em 0px 0px" }}
              key={memory.memoryId}
              className="d-flex flex-column w-100 mx-auto my-4 bg-light border shadow-sm justify-content-between"
            >
              <div
                className="mx-auto w-100"
                style={{
                  height: "15em",
                  width: "100%",
                  borderRadius: "2em 2em 0px 0px",
                  backgroundImage: `url(${memory.memoryimage[0].memoryImagePath})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="d-flex text-center">
                <div className="text-center p-3">
                  <p className="p-0 m-0">{memory.memoryBody}</p>
                </div>
              </div>
              <div className="d-flex flex-column h-auto align-content-en pb-3">
                <hr className="w-100 my-2 " />
                <p
                  style={{ fontSize: ".75rem" }}
                  className="text-muted text-start m-0 ms-2 p-0"
                >
                  {memory.memoryForename} {memory.memorySurname}
                </p>
                <hr className="w-100 my-2" />
                <p
                  style={{ fontSize: ".75rem" }}
                  className="text-muted text-start m-0 ms-2 p-0"
                >
                  {new Date(memory.memoryUpdated).toDateString()}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Deceased;
