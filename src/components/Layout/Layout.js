import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "../Nav/NavBar";

const Layout = ({ children, isLoading }) => {
  return (
    <>
      <NavBar></NavBar>
      {children}
    </>
  );
};
//style={{ height: "calc(100vh - 56px - 1rem)" }}
export default Layout;
