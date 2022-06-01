import React, { useState, useContext } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { AuthContext } from "../../auth/AuthContext";
import { AlertContext } from "../../Alerts/AlertContext";

import GlobalToast from "../Alert/GlobalToast";

const KeepsakeAddFormModal = (props) => {
  const { user } = useContext(AuthContext);
  const { setToast } = useContext(AlertContext);

  const [modalShow, setModalShow] = useState(false);
  // States for user input
  const [deceasedForename, setDeceasedForename] = useState("");
  const [deceasedMiddlename, setDeceasedMiddlename] = useState("");
  const [deceasedSurname, setDeceasedSurname] = useState("");
  const [deceasedDateOfBirth, setDeceasedDateOfBirth] = useState("");
  const [deceasedDateOfDeath, setDeceasedDateOfDeath] = useState("");
  const [deceasedDetails, setDeceasedDetails] = useState("");
  const [userImage, setUserImage] = useState({ image: null });

  const [validated, setValidated] = useState(false);

  // State for image preview. Stored as URL.createObjectURL
  const [userImagePreview, setUserImagePreview] = useState({ image: null });

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      const formData = new FormData();
      const birthDateTime = new Date(deceasedDateOfBirth).toISOString();
      const deathDateTime = new Date(deceasedDateOfDeath).toISOString();
      formData.append("userImageUpload", userImage.image);
      formData.append("deceasedForename", deceasedForename);
      formData.append("deceasedMiddlename", deceasedMiddlename);
      formData.append("deceasedSurname", deceasedSurname);
      formData.append("deceasedDateOfBirth", birthDateTime);
      formData.append("deceasedDateOfDeath", deathDateTime);
      formData.append("deceasedDetails", deceasedDetails);

      axios
        .post(
          `http://localhost:4000/deceased/add?deceasedUserId=${user.userId}`,
          formData,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setToast({
            title: "Success",
            body: "Added Keepsake",
            show: true,
            variant: "success",
          });
          setModalShow(false);
          props.setRefresh(true);
        })
        .catch((err) => {
          setToast({
            title: "Failed",
            body: "User action failed",
            show: true,
            variant: "danger",
          });
          console.log(err);
        });
    }
  };

  const imageChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setUserImagePreview({
        image: URL.createObjectURL(img),
      });
      setUserImage({ image: img });
    }
  };

  return (
    <>
      <GlobalToast />
      <Button
        className="d-grid"
        size="lg"
        style={{ width: "100%" }}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Add Keepsake
      </Button>
      <Modal
        size="lg"
        centered
        show={modalShow}
        onHide={handleClose}
        aria-labelledby="userDeceasedFormModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="userDeceasedFormModal">Add Keepsake</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={validated}
          name="userDeceasedUpload"
          onSubmit={handleSubmit}
          className="bg-light p-4 m-2 rounded shadow-sm border"
        >
          <Row className="mb-2">
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={4}
              className="mb-2"
              controlId="formForename"
            >
              <Form.Label>Forename</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedForename(e.target.value)}
                value={deceasedForename}
                required
                type="text"
                placeholder="Forename"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={4}
              className="mb-2"
              controlId="formMiddlename"
            >
              <Form.Label>Middlename</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedMiddlename(e.target.value)}
                value={deceasedMiddlename}
                type="text"
                placeholder="Middlename"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={4}
              className="mb-2"
              controlId="formSurname"
            >
              <Form.Label>Surname</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedSurname(e.target.value)}
                value={deceasedSurname}
                required
                type="text"
                placeholder="Surname"
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={6}
              className="mb-2"
              controlId="formDateOfBirth"
            >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedDateOfBirth(e.target.value)}
                value={deceasedDateOfBirth}
                required
                type="date"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={6}
              className="mb-2"
              controlId="formDateOfDeath"
            >
              <Form.Label>Date of Death</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedDateOfDeath(e.target.value)}
                value={deceasedDateOfDeath}
                required
                type="date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            {/*Image upload Form.Group*/}
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={12}
              className="mb-2"
              controlId="formFile"
            >
              <Form.Label>Image</Form.Label>
              {userImage.image ? (
                <div className="position-relative d-flex justify-content-center mb-2">
                  <img
                    className="border w-25 h-25"
                    src={userImagePreview.image}
                  />
                  <Button
                    onClick={() => {
                      setUserImage({ image: null });
                      setUserImagePreview({ image: null });
                    }}
                    variant="outline-danger"
                    className="position-absolute bottom-0 end-0"
                  >
                    Clear
                  </Button>
                </div>
              ) : null}

              <Form.Control
                required
                onChange={imageChangeHandler}
                name="partImageUpload"
                type="file"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={12}
              className="mb-2"
              controlId="formDetails"
            >
              <Form.Label>Your message</Form.Label>
              <Form.Control
                onChange={(e) => setDeceasedDetails(e.target.value)}
                value={deceasedDetails}
                required
                as="textarea"
                placeholder="Some words about the person who you are creating the Keepsake for"
              />
            </Form.Group>
          </Row>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KeepsakeAddFormModal;
