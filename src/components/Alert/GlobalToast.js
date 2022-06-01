import React, { useState, useContext } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { AlertContext } from "../../Alerts/AlertContext";

const GlobalToast = () => {
  const { toast, setToast } = useContext(AlertContext);

  return (
    <div className="position-relative">
      <ToastContainer position="middle-center">
        <Toast
          onClose={() =>
            setToast({
              title: "",
              body: "",
              show: false,
              variant: "",
            })
          }
          bg={toast.variant}
          show={toast.show}
          autohide
          delay={2000}
        >
          <Toast.Header>
            <strong className="me-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body>{toast.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default GlobalToast;
