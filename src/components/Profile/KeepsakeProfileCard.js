import React from "react";
import { useNavigate } from "react-router-dom";

import { sqlDateConvert } from "../../helpers/helpers";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

import ConfirmModal from "../Modal/ConfirmModal";

// Imports for svgs
import { ReactComponent as Trash } from "../../Assets/svg/trash.svg";
import { ReactComponent as Edit } from "../../Assets/svg/edit.svg";

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
          props.toast.success("Success! Keepsake deleted", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (res.status >= 400) {
          props.toast.error("Error. Please try again", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        props.toast.error("Error. Please try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
                <Edit />
              </Button>
              <ConfirmModal
                title="Delete Keepsake"
                body="Are you sure you want to delete this Keepsake?"
                variant="danger"
                buttonContent={<Trash />}
                functionOnConfirm={deleteKeepsakeHandler}
                data={deceased}
              />
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default KeepsakeProfileCard;
