import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { AuthContext } from "../../auth/AuthContext";

const MemoryAddFormModal = (props) => {
  const { user } = useContext(AuthContext);
  let { deceasedId } = useParams();

  const [modalShow, setModalShow] = useState(false);
  // States for user input
  const [memoryForename, setMemoryForename] = useState("");
  const [memorySurname, setMemorySurname] = useState("");
  const [memoryBody, setMemoryBody] = useState("");
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
      formData.append("userImageUpload", userImage.image);
      formData.append("memoryForename", memoryForename);
      formData.append("memorySurname", memorySurname);
      formData.append("memoryBody", memoryBody);

      axios
        .post(
          `http://localhost:4000/memory/add?deceasedId=${deceasedId}`,
          formData,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setModalShow(false);
          props.setRefresh(true);
        })
        .catch((err) => console.log(err));
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
      <Button
        className="d-grid"
        size="lg"
        style={{ width: "100%" }}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Add Memory
      </Button>
      <Modal
        size="lg"
        centered
        show={modalShow}
        onHide={handleClose}
        aria-labelledby="userDeceasedFormModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="userDeceasedFormModal">Add Memory</Modal.Title>
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
                onChange={(e) => setMemoryForename(e.target.value)}
                value={memoryForename}
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
              controlId="formSurname"
            >
              <Form.Label>Surname</Form.Label>
              <Form.Control
                onChange={(e) => setMemorySurname(e.target.value)}
                value={memorySurname}
                type="text"
                placeholder="Surname"
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
              <Form.Label>Your memory</Form.Label>
              <Form.Control
                onChange={(e) => setMemoryBody(e.target.value)}
                value={memoryBody}
                required
                as="textarea"
                placeholder="Your memory of the dearly departed"
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

export default MemoryAddFormModal;
