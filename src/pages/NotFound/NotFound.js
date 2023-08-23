import React from "react";

const NotFound = () => {
  const styles = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  };
  const stylesH1 = {
    fontSize: "60px",
  };
  return (
    <div style={styles}>
      <h1 style={stylesH1}>Not Found</h1>
    </div>
  );
};

export default NotFound;
