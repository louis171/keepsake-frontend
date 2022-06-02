import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { sqlDateConvert } from "../../helpers/helpers";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import MemoryAddFormModal from "../Memory/MemoryAddFormModal";

import GlobalToast from "../Alert/GlobalToast";

const Memory = () => {
  const [deceasedData, setDeceasedData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [filteredMemoryData, setFilteredMemoryData] = useState([]);
  // States for filters/options
  const [searchValue, setSearchValue] = useState("");
  // Gets deceasedId from URL
  let { deceasedId } = useParams();

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
    <>
    <GlobalToast />
      <Container>
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
    </>
  );
};

export default Memory;
