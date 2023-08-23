import React from "react";
import styles from "./NoAuth.module.css";
import { useNavigate } from "react-router-dom";

const NoAuth = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.parent_noAuth}>
      <div>
        <h1>Вы не вошли в аккаунт!</h1>
        <p>
          <button onClick={() => navigate("/login")}>Нажмите сюда</button> ,
          чтобы войти в аккаунт
        </p>
      </div>
    </div>
  );
};

export default NoAuth;
