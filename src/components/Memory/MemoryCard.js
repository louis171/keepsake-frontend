import React, { useContext } from "react";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ConfirmModal from "../Modal/ConfirmModal";

import { AuthContext } from "../../auth/AuthContext";

// Imports for svgs
import { ReactComponent as Trash } from "../../Assets/svg/trash.svg";
import { ReactComponent as Edit } from "../../Assets/svg/edit.svg";

const MemoryCard = (props) => {
  const { user } = useContext(AuthContext);

  const { filteredMemoryData, setFilteredMemoryData, toast } = props;

  const deleteMemoryHandler = (memory) => {
    axios
      .delete(
        `http://localhost:4000/memory/delete?memoryId=${memory.memoryId}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status == 200) {
          toast.success("Success! Memory deleted", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const value = filteredMemoryData.filter((filteredMemory) => {
            return filteredMemory.memoryId !== memory.memoryId;
          });
          setFilteredMemoryData(value);
        } else if (res.status >= 400) {
          toast.error("Error. Please try again", {
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
        toast.error("Error. Please try again", {
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

  return filteredMemoryData.map((memory) => (
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
        {user.auth ? (
          <div className="d-flex justify-content-center">
            <Button
              style={{ borderRadius: ".25em 0 0 .25em" }}
              as={Col}
              variant="primary"
            >
              <Edit />
            </Button>
            <ConfirmModal
              title="Delete Memory"
              body="Are you sure you want to delete this Memory?"
              variant="danger"
              buttonContent={<Trash />}
              functionOnConfirm={deleteMemoryHandler}
              data={memory}
            />
          </div>
        ) : null}
      </div>
    </Col>
  ));
};

export default MemoryCard;
