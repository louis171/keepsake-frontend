import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sqlDateConvert } from "../../helpers/helpers";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Loading from "./Loading";
import KeepsakeAddFormModal from "../Profile/KeepsakeAddFormModal";
import { AuthContext } from "../../auth/AuthContext";
import { AlertContext } from "../../Alerts/AlertContext";
import MemoryCreationPrompt from "../Profile/MemoryCreationPrompt";
import KeepsakeProfileCard from "../Profile/KeepsakeProfileCard";

import GlobalToast from "../Alert/GlobalToast";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { setToast } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [deceasedUserData, setDeceasedUserData] = useState([]);
  const [filteredKeepsakes, setFilteredKeepsakes] = useState([]);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/info", { withCredentials: true })
      .then((res) => {
        // Checks status when from API response. If the status is 400 or above then redirect to login page
        if (res.status == 200) {
          setUserData(res.data);
        } else if (res.status >= 400) {
          navigate("/login", { replace: true });
        }
      });
    axios
      .get(`http://localhost:4000/deceased/user?userId=${user.userId}`)
      .then((res) => {
        setDeceasedUserData(res.data);
        setIsLoading(false);
        setRefresh(false);
      });
  }, [refresh]);

  // Filters keepsakes by date descending
  useEffect(() => {
    setFilteredKeepsakes(
      deceasedUserData.sort(
        (a, b) => new Date(b.deceasedCreated) - new Date(a.deceasedCreated)
      )
    );
  }, [deceasedUserData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <GlobalToast />
      <Container>
        <Row>
          <Col sm={12} md={12} lg={6}>
            <h1 className="display-2">Hello, {userData.user.userForename}</h1>
            <div className="text-center">
              <p>User since: {sqlDateConvert(userData.user.usersCreated)}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={6}>
            <p>Search</p>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={12} md={12} lg={12}>
            <h4 className="m-0 p-0 text-center">My memory pages</h4>
          </Col>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-center"
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <KeepsakeAddFormModal setRefresh={setRefresh} />
          </Col>
        </Row>
      </Container>
      <Container>
        {deceasedUserData.length == 0 ? (
          <MemoryCreationPrompt />
        ) : (
          <KeepsakeProfileCard
            setFilteredKeepsakes={setFilteredKeepsakes}
            filteredKeepsakes={filteredKeepsakes}
          />
        )}
      </Container>
    </>
  );
};

export default Profile;
