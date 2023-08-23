import React, { useEffect, useState } from "react";
import styles from "./RegistrationPage.module.css";
import logo from "../../assests/images/logo/logo_library.svg";
import library from "../../assests/images/login_registration/registration_page.jpg";
import { NavLink } from "react-router-dom";
import MainRegistration from "../../components/Authorization/MainRegistration/MainRegistration";

export const RegistrationPage = () => {
  return (
    <div className={styles.parent_login}>
      <div className={styles.inner_login_left}></div>
      <div className={styles.inner_login_right}>
        <img src={library} alt="" />
      </div>
      <div className="container_auth">
        <div className={styles.child_login}>
          <div className={styles.child_login_left}>
            <div className={styles.block_logo}>
              <div>
                <img src={logo} alt="" />
              </div>
              <h1>Muras</h1>
            </div>
            <h2>Регистрация </h2>
            <p>
              Зарегистрируйтесь, чтобы бесплатно читать книги ваших любимых
              писателей
            </p>
            <div className={styles.block_btns_active}>
              <button className={styles.active_btn_win}>
                <NavLink to={"/registration"}>Регистрация</NavLink>
              </button>
              <button>
                <NavLink to={"/login"}>Вход</NavLink>
              </button>
            </div>
            <MainRegistration />
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
export default RegistrationPage;
