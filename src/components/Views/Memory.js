import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sqlDateConvert } from "../../helpers/helpers";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import MemoryAddFormModal from "../Memory/MemoryAddFormModal";
import MemoryCard from "../Memory/MemoryCard";

import { ToastContainer, toast } from "react-toastify";

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
      <ToastContainer />
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
                <div className="my-4 h-100">
                  <div
                    className="mx-auto w-auto"
                    style={{
                      height: "20em",
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
            <MemoryAddFormModal toast={toast} setRefresh={setRefresh} />
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
          <MemoryCard
            toast={toast}
            setFilteredMemoryData={setFilteredMemoryData}
            filteredMemoryData={filteredMemoryData}
          />
        </Row>
      </Container>
    </>
  );
};

export default Memory;
