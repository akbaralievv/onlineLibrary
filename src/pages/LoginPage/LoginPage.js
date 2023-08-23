import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assests/images/logo/logo_library.svg";
import library from "../../assests/images/login_registration/login_page.jpg";
import { NavLink } from "react-router-dom";
import MainLogin from "../../components/Authorization/MainLogin/MainLogin";
import RecoveryAccount from "../../components/Authorization/RecoveryAccount/RecoveryAccount";

export const LoginPage = () => {
  const [restore, setRestore] = useState(false);
  return (
    <div className={styles.parent_login}>
      <div className={styles.inner_login_left}></div>
      <div className={styles.inner_login_right}>
        <img src={library} alt="library" />
      </div>
      <div className="container_auth">
        <div className={styles.child_login}>
          <div className={styles.child_login_left}>
            <div className={styles.block_logo}>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <h1>Muras</h1>
            </div>
            <h2>Добро пожаловать! </h2>
            <p>
              Войдите, что бы бесплатно читать великие произведения кыргызских
              писателей на нашем сайте.
            </p>
            <div className={styles.block_btns_active}>
              <button>
                <NavLink to={"/registration"}>Регистрация</NavLink>
              </button>
              <button className={styles.active_btn_win}>
                <NavLink to={"/login"}>Вход</NavLink>
              </button>
            </div>
            {restore ? (
              <RecoveryAccount setRestore={setRestore} />
            ) : (
              <MainLogin setRestore={setRestore} />
            )}
          </div>
          <div className={styles.child_login_right}>
            <p>
              Читайте книги великих кыргызских писателей на нашем сайте или
              скачайте приложение “Мурас” в Google Play бесплатно.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
