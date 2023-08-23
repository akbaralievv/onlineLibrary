import React from "react";
import styles from "./LogOut.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logOutAccount = () => {
    localStorage.clear();
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.parent_logOut}>
      <button onClick={logOutAccount}>Выйти из аккаунта</button>
    </div>
  );
};

export default LogOut;
