import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { sqlDateConvert } from "../../helpers/helpers";
import axios from "axios";

import Loading from "./Loading";

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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

import { LinkContainer } from "react-router-bootstrap";

import { getExcerpt } from "../../helpers/helpers";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deceasedData, setDeceasedData] = useState([]);
  const [filteredDeceasedData, setFilteredDeceasedData] = useState([]);
  // States for filters/options
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/deceased/all`,
    }).then((response) => {
      setDeceasedData(response.data);
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });
  }, []);

  // useEffect for filtering by search string
  useEffect(() => {
    setFilteredDeceasedData(
      deceasedData.filter((deceased) => {
        return (
          deceased.deceasedForename
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          deceased.deceasedSurname
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      })
    );
  }, [deceasedData, searchValue]);

  // Sets state for string search
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid="lg" className="mt-4">
      <Row className="d-block h-100 d-md-flex mb-5">
        <Col className="h-100 m-auto mb-4 d-md-block">
          <Image style={{ borderRadius: "4rem" }}
            className="w-100"
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
          <h2 className="text-center">Recent memories</h2>
          <Carousel variant="dark">
            {deceasedData.map((deceased) => (
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
      <Row className="my-4 py-3 bg-light border shadow-sm">
        <Col>
          <div className="mb-5">
            <div>
              <h2 className="display-3">
                What is <span style={{ fontWeight: "bold" }}>Keep</span>sake?
              </h2>
            </div>
            <div>
              <p>
                Keepsake offers a place to store your loved one cherished
                memories and condolences from people all over the world
              </p>
            </div>
          </div>
          <div className="text-center mb-4">
            <h3>Get started by creating your own memory page today</h3>
          </div>
          <div className="d-grid gap-2">
            <LinkContainer to="/register">
              <Button size="lg" variant="primary">
                Get started
              </Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Search for memories</h2>
          <InputGroup>
            <Form.Control
              onChange={handleSearchChange}
              value={searchValue}
              placeholder="Search by name"
              aria-label="Search"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {filteredDeceasedData.map((deceased) => (
            <div key={deceased.deceasedId} onClick={() => navigate(`/memory/${deceased.deceasedId}`)}>
              <div className="d-flex align-items-center">
                <div
                  className="mt-2 me-2"
                  style={{
                    height: "6em",
                    width: "6em",
                    borderRadius: ".5em",
                    backgroundImage: `url(${deceased.deceasedimage[0].deceasedImagePath})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div>
                  <h4 className="m-0 p-0 text-primary">
                    {deceased.deceasedForename} {deceased.deceasedMiddlename}{" "}
                    {deceased.deceasedSurname}
                  </h4>
                  <p
                    style={{ fontSize: ".875rem" }}
                    className="m-0 p-0 text-muted"
                  >
                    {sqlDateConvert(deceased.deceasedDateOfBirth)}
                    {" - "}
                    {sqlDateConvert(deceased.deceasedDateOfDeath)}
                  </p>
                </div>
              </div>
              <hr className="w-100 my-2" />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
