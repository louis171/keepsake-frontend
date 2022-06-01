import React from "react";
import { useNavigate } from "react-router-dom";

import { sqlDateConvert } from "../../helpers/helpers";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

const KeepsakeProfileCard = (props) => {
  // Destructuring props
  const { filteredKeepsakes } = props;

  const navigate = useNavigate();

  const deleteKeepsakeHandler = (keepsake) => {
    const value = filteredKeepsakes.filter((filteredKeepsake) => {
      return filteredKeepsake.deceasedId !== keepsake.deceasedId;
    });
    props.setFilteredKeepsakes(value);
    axios
      .delete(
        `http://localhost:4000/deceased/delete?deceasedId=${keepsake.deceasedId}`
      )
      .then((res) => {
        if (res.status == 200) {
          // Show success modal
        } else if (res.status >= 400) {
          // Show failed modal
        }
      })
      .catch((err) => {
        console.log(err);
        // Show error modal
      });
  };

  return (
    <Row>
      <Col>
        {filteredKeepsakes.map((deceased) => (
          <div
            className="bg-light p-2 mt-4 rounded shadow-sm"
            key={deceased.deceasedId}
          >
            <div onClick={() => navigate(`/memory/${deceased.deceasedId}`)}>
              <div className="d-flex align-items-center">
                <div
                  className="me-3"
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
                  <div>
                    <h4 className="m-0 p-0">
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
              </div>
              <div className="my-2">
                <p className="text-center" style={{ fontSize: ".85rem" }}>
                  {deceased.deceasedDetails}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-around my-2">
              <div>
                <p style={{ fontSize: ".75rem" }} className="m-0 p-0">
                  Created: {sqlDateConvert(deceased.deceasedCreated)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ".75rem" }} className="m-0 p-0">
                  Updated: {sqlDateConvert(deceased.deceasedUpdated)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                style={{ borderRadius: ".25em 0 0 .25em" }}
                as={Col}
                variant="primary"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 16C26 15.7348 26.1054 15.4804 26.2929 15.2929C26.4804 15.1054 26.7348 15 27 15C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16V27C28 27.2652 27.8946 27.5196 27.7071 27.7071C27.5196 27.8946 27.2652 28 27 28H5C4.73478 28 4.48043 27.8946 4.29289 27.7071C4.10536 27.5196 4 27.2652 4 27V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H16C16.2652 4 16.5196 4.10536 16.7071 4.29289C16.8946 4.48043 17 4.73478 17 5C17 5.26522 16.8946 5.51957 16.7071 5.70711C16.5196 5.89464 16.2652 6 16 6H6V26H26V16Z"
                    fill="white"
                  />
                  <path
                    d="M14.686 17.32L16.336 17.084L26.472 6.95001C26.5675 6.85776 26.6437 6.74742 26.6961 6.62542C26.7485 6.50341 26.7761 6.37219 26.7773 6.23941C26.7784 6.10663 26.7531 5.97495 26.7029 5.85206C26.6526 5.72916 26.5783 5.61751 26.4844 5.52362C26.3905 5.42972 26.2789 5.35547 26.156 5.30519C26.0331 5.25491 25.9014 5.22961 25.7686 5.23076C25.6358 5.23192 25.5046 5.2595 25.3826 5.31191C25.2606 5.36432 25.1503 5.4405 25.058 5.53601L14.92 15.67L14.684 17.32H14.686ZM27.886 4.12001C28.1648 4.39861 28.386 4.72942 28.5368 5.09352C28.6877 5.45762 28.7654 5.84788 28.7654 6.24201C28.7654 6.63614 28.6877 7.0264 28.5368 7.39051C28.386 7.75461 28.1648 8.08541 27.886 8.36401L17.516 18.734C17.3631 18.8875 17.1645 18.9872 16.95 19.018L13.65 19.49C13.4962 19.5121 13.3394 19.498 13.192 19.449C13.0446 19.3999 12.9106 19.3171 12.8008 19.2073C12.6909 19.0974 12.6082 18.9635 12.5591 18.816C12.51 18.6686 12.4959 18.5118 12.518 18.358L12.99 15.058C13.0203 14.8438 13.1193 14.6452 13.272 14.492L23.644 4.12201C24.2066 3.5596 24.9695 3.24365 25.765 3.24365C26.5605 3.24365 27.3234 3.5596 27.886 4.12201V4.12001Z"
                    fill="white"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => deleteKeepsakeHandler(deceased)}
                style={{ borderRadius: "0 .25em .25em 0" }}
                as={Col}
                variant="danger"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.99999H3C2.73478 7.99999 2.48043 7.89463 2.29289 7.70709C2.10536 7.51956 2 7.2652 2 6.99999C2 6.73477 2.10536 6.48042 2.29289 6.29288C2.48043 6.10534 2.73478 5.99999 3 5.99999H11V2.99799C11 2.73277 11.1054 2.47842 11.2929 2.29088C11.4804 2.10334 11.7348 1.99799 12 1.99799H20C20.2652 1.99799 20.5196 2.10334 20.7071 2.29088C20.8946 2.47842 21 2.73277 21 2.99799V5.99999H29C29.2652 5.99999 29.5196 6.10534 29.7071 6.29288C29.8946 6.48042 30 6.73477 30 6.99999C30 7.2652 29.8946 7.51956 29.7071 7.70709C29.5196 7.89463 29.2652 7.99999 29 7.99999H27V29C27 29.2652 26.8946 29.5196 26.7071 29.7071C26.5196 29.8946 26.2652 30 26 30H6C5.73478 30 5.48043 29.8946 5.29289 29.7071C5.10536 29.5196 5 29.2652 5 29V7.99999ZM19 5.99999V3.99999H13V5.99999H19ZM7 28H25V7.99999H7V28ZM13 24C12.7348 24 12.4804 23.8946 12.2929 23.7071C12.1054 23.5196 12 23.2652 12 23V13C12 12.7348 12.1054 12.4804 12.2929 12.2929C12.4804 12.1053 12.7348 12 13 12C13.2652 12 13.5196 12.1053 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13V23C14 23.2652 13.8946 23.5196 13.7071 23.7071C13.5196 23.8946 13.2652 24 13 24ZM19 24C18.7348 24 18.4804 23.8946 18.2929 23.7071C18.1054 23.5196 18 23.2652 18 23V13C18 12.7348 18.1054 12.4804 18.2929 12.2929C18.4804 12.1053 18.7348 12 19 12C19.2652 12 19.5196 12.1053 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13V23C20 23.2652 19.8946 23.5196 19.7071 23.7071C19.5196 23.8946 19.2652 24 19 24Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default KeepsakeProfileCard;
