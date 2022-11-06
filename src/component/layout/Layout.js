import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Header />
        {children}
      </React.Fragment>
    </div>
  );
};

export default Layout;
