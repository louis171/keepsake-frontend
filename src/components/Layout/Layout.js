import React from "react";

import NavBar from "../Nav/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar></NavBar>
      {props.children}
    </>
  );
};

export default Layout;
