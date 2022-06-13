import React from "react";
import { useNavigate } from "react-router-dom";

import { sqlDateConvert } from "../../helpers/helpers";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

import ConfirmModal from "../Modal/ConfirmModal";
import KeepsakeEditFormModal from "./KeepsakeEditFormModal";

// Imports for svgs
import { ReactComponent as Trash } from "../../Assets/svg/trash.svg";
import { ReactComponent as Edit } from "../../Assets/svg/edit.svg";

const KeepsakeProfileCard = (props) => {
  // Destructuring props
  const { filteredKeepsakes, toast, setRefresh } = props;

  const navigate = useNavigate();

  const deleteKeepsakeHandler = (keepsake) => {
    axios
      .delete(
        `http://localhost:4000/deceased/delete?deceasedId=${keepsake.deceasedId}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status == 200) {
          toast.success("Success! Keepsake deleted");
          const value = filteredKeepsakes.filter((filteredKeepsake) => {
            return filteredKeepsake.deceasedId !== keepsake.deceasedId;
          });
          props.setFilteredKeepsakes(value);
        } else if (res.status >= 400) {
          toast.error("Error. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error. Please try again");
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/memory/${deceased.deceasedId}`)}
            >
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
              <KeepsakeEditFormModal
                setRefresh={setRefresh}
                toast={toast}
                deceased={deceased}
              />

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
