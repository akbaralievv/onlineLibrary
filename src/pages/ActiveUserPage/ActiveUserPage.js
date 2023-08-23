import React, { useEffect, useState } from "react";
import styles from "./ActiveUserPage.module.css";
import logo from "../../assests/images/logo/logo_library.svg";
import library from "../../assests/images/login_registration/registration_page.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  changePreloader,
  repeatSendSMSActivation,
  sendRequestOnToTakeTokens,
} from "../../store/reducers/windowsSlice";
import { changeCheckedUser } from "../../store/reducers/usersStateSlice";
import Preloader from "../../components/Preloader/Preloader";

const ActiveUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCode, setActiveCode] = useState("");
  const [errorActiveCode, setErrorActiveCode] = useState(false);
  const { preloader } = useSelector((state) => state.windowsSlice);
  const sendRequestLogin = async (e) => {
    e.preventDefault();
    dispatch(changePreloader(true));
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://kitepkana1.pythonanywhere.com/auth/users/activation/",
        data: {
          code: activeCode,
        },
      });
      // console.log(data, "ActiveUserPage");
      dispatch(sendRequestOnToTakeTokens());
      setTimeout(() => {
        if (localStorage.getItem("access") && localStorage.getItem("refresh")) {
          dispatch(changeCheckedUser(true));
          dispatch(changePreloader(false));
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.log(error, "error ActiveUserPage");
      setErrorActiveCode(true);
      dispatch(changePreloader(false));
      setTimeout(() => {
        setErrorActiveCode(false);
      }, 1500);
    }
  };
  useEffect(() => {
    dispatch(changePreloader(false));
  }, []);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
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
                <div className={styles.parentBlock_activation}>
                  <form action="" onSubmit={sendRequestLogin}>
                    <input
                      placeholder="- - - -"
                      className={styles.input_numbers_recover}
                      pattern="\d{4}"
                      maxLength="4"
                      required
                      onChange={(e) => setActiveCode(e.target.value)}
                    />
                    {errorActiveCode && (
                      <label className={styles.error_notSMS}>
                        Неверный код!!!
                      </label>
                    )}
                    <p>Введите код из 4 цифр</p>
                    <button type="submit">Активировать</button>
                  </form>
                  <label className={styles.repeatSMS}>
                    Не пришёл код?
                    <button onClick={() => dispatch(repeatSendSMSActivation())}>
                      Отправить еще раз
                    </button>
                  </label>
                </div>
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
      )}
    </>
  );
};

export default ActiveUserPage;
