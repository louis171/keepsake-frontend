import React, { useState } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const AlertSuccess = (props) => {
  const [alertShow, setAlertShow] = useState(false);

  return (
    <div className="position-relative">
      <ToastContainer position="middle-center">
        <Toast bg="success" show={true} autohide delay={3000}>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Added new Keepsake</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AlertSuccess;
