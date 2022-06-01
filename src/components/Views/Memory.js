import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { sqlDateConvert } from "../../helpers/helpers";
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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../auth/AuthContext";
import MemoryAddFormModal from "../Memory/MemoryAddFormModal";

const Memory = () => {
  const { user } = useContext(AuthContext);
  const [deceasedData, setDeceasedData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [filteredMemoryData, setFilteredMemoryData] = useState([]);
  // States for filters/options
  const [searchValue, setSearchValue] = useState("");
  // Gets deceasedId from URL
  let { deceasedId } = useParams();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/deceased/deceasedId?deceasedId=${deceasedId}`,
    }).then((response) => {
      setDeceasedData(response.data);
    });
    axios({
      method: "get",
      url: `http://localhost:4000/memory/?deceasedId=${deceasedId}`,
    }).then((response) => {
      setMemoryData(response.data);
      setRefresh(false);
    });
  }, [refresh]);

  // useEffect for filtering by search string
  useEffect(() => {
    setFilteredMemoryData(
      memoryData.filter((memory) => {
        return (
          memory.memoryForename
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          memory.memorySurname.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }, [memoryData, searchValue]);

  // Sets state for string search
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <Container>
      <Row>
        <Col>
          {user.auth ? (
            <Button
              onClick={() => navigate(-1)}
              variant="secondary"
              className="p-1 d-flex justify-content-around align-items-center"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H7C6.73478 17 6.48043 16.8946 6.29289 16.7071C6.10536 16.5196 6 16.2652 6 16C6 15.7348 6.10536 15.4804 6.29289 15.2929C6.48043 15.1054 6.73478 15 7 15Z"
                  fill="white"
                />
                <path
                  d="M7.41396 16L15.708 24.292C15.8957 24.4798 16.0012 24.7345 16.0012 25C16.0012 25.2656 15.8957 25.5202 15.708 25.708C15.5202 25.8958 15.2655 26.0013 15 26.0013C14.7344 26.0013 14.4797 25.8958 14.292 25.708L5.29196 16.708C5.19883 16.6151 5.12494 16.5048 5.07453 16.3833C5.02412 16.2618 4.99817 16.1315 4.99817 16C4.99817 15.8685 5.02412 15.7382 5.07453 15.6167C5.12494 15.4953 5.19883 15.3849 5.29196 15.292L14.292 6.29201C14.4797 6.10424 14.7344 5.99875 15 5.99875C15.2655 5.99875 15.5202 6.10424 15.708 6.29201C15.8957 6.47979 16.0012 6.73446 16.0012 7.00001C16.0012 7.26556 15.8957 7.52024 15.708 7.70801L7.41396 16Z"
                  fill="white"
                />
              </svg>
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          {deceasedData.map((deceased) => (
            <div key={deceased.deceasedId}>
              <div className="text-center">
                <h1 className="display-2">
                  In memory of {deceased.deceasedForename}{" "}
                  {deceased.deceasedMiddlename} {deceased.deceasedSurname}
                </h1>
                <hr className="w-100 my-2" />
                <h3>
                  {sqlDateConvert(deceased.deceasedDateOfBirth)}
                  {" - "}
                  {sqlDateConvert(deceased.deceasedDateOfDeath)}
                </h3>
              </div>
              <div className="my-4">
                <div
                  className="mx-auto w-100"
                  style={{
                    height: "25em",
                    width: "100%",
                    borderRadius: "2em",
                    backgroundImage: `url(${deceased.deceasedimage[0].deceasedImagePath})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              <div className="text-center">{deceased.deceasedDetails}</div>
              <hr className="w-100 my-2" />
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-between text-center bg-light rounded border shadow-sm p-2">
          <h1 className="m-0 p-0 mb-4">Memories</h1>
          <MemoryAddFormModal setRefresh={setRefresh} />
          <InputGroup className="mt-4">
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
        {filteredMemoryData.map((memory) => (
          <Col
            key={memory.memoryId}
            sm={12}
            md={12}
            lg={4}
            className="d-flex align-content-stretch"
          >
            <div
              style={{ borderRadius: "2em 2em 0px 0px" }}
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

export default Memory;
