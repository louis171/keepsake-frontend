import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "../Nav/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar></NavBar>
      <Container fluid="lg" style={{ height: "calc(100vh - 56px - 1rem)" }}>{props.children}</Container>
    </>
  );
};

export default Layout;
