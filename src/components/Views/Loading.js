import React from "react";

import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <main style={{ marginTop: "-56px" }} className="position-fixed d-flex w-100 h-100 m-0 p-0 justify-content-center align-items-center">
      <div className="m-0 p-0 text-center">
        <h1 style={{ letterSpacing: ".5rem" }} className="m-0 p-0 display-1">
          <span style={{ fontWeight: "bold" }}>Keep</span>sake
        </h1>
        <Spinner
          className="m-0 p-0 mt-4"
          animation="border"
          role="status"
        >
          <span className="visually-hidden m-0 p-0">Loading...</span>
        </Spinner>
      </div>
    </main>
  );
};

export default Loading;
