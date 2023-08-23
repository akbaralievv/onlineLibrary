import React, { useEffect, useState } from "react";
import styles from "./MainLogin.module.css";
import EyePassword from "../EyePassword/EyePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { changeCheckedUser } from "../../../store/reducers/usersStateSlice";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../Preloader/Preloader";
import { changePreloader } from "../../../store/reducers/sendRequestMainPageSlice";

const MainLogin = ({ setRestore }) => {
  const { preloader } = useSelector((state) => state.sendRequestMainPageSlice);
  const [data, setDate] = useState({
    login: "",
    password: "",
  });

  const [wrong, setWrong] = useState({
    errorPassword: false,
    errorlogin_password: false,
    lookPassword: false,
    lookBtnEye: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gmailRegExp = /^[A-Za-z0-9_\-\.\-]+\@[gmail]+\.com$/;

  const sendDataLogin = async (e) => {
    e.preventDefault();
    if (gmailRegExp.test(data.login)) {
      setWrong((info) => ({
        ...info,
        errorlogin: false,
      }));
      dispatch(changePreloader(true));
      // console.log(wrong.errorlogin);
      try {
        const info = await axios({
          method: "POST",
          url: "http://kitepkana1.pythonanywhere.com/auth/jwt/create/",
          data: {
            email: data.login,
            password: data.password,
          },
        });
        // console.log(info, "data");
        localStorage.setItem("access", info.data.access);
        localStorage.setItem("refresh", info.data.refresh);
        setTimeout(() => {
          if (info.data.access && info.data.refresh) {
            navigate("/");
            setDate((info) => ({ ...info, login: "", password: "" }));
            dispatch(changeCheckedUser(true));
            dispatch(changePreloader(false));
          }
        }, 500);
      } catch (error) {
        dispatch(changePreloader(false));
        setWrong((info) => ({
          ...info,
          errorlogin_password: true,
        }));
        console.log(error, "auth/jwt/create/");
      }
      setTimeout(() => {
        setWrong((info) => ({
          ...info,
          errorlogin_password: false,
        }));
      }, 1500);
    } else {
      setWrong((info) => ({
        ...info,
        errorlogin: true,
      }));
      setTimeout(() => {
        setWrong((info) => ({
          ...info,
          errorlogin: false,
        }));
      }, 1500);
      // console.log(wrong.errorlogin);
    }
  };

  useEffect(() => {
    dispatch(changePreloader(false));

    if (data.password.length > 0) {
      setWrong((info) => ({
        ...info,
        lookBtnEye: true,
      }));
    } else {
      setWrong((info) => ({
        ...info,
        lookBtnEye: false,
      }));
    }
  }, [data]);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.parentBlock_mainLogin}>
          <form
            action=""
            onSubmit={sendDataLogin}
            className={styles.form_login}
          >
            <label className={styles.login_block}>
              <input
                className={styles.input_email}
                placeholder="E-mail "
                required
                name="email"
                // type="email"
                value={data.login}
                onChange={(e) =>
                  setDate((info) => ({ ...info, login: e.target.value }))
                }
              />
            </label>
            {wrong.errorlogin && (
              <label className={styles.wrongEmail}>Неверный Email!</label>
            )}
            <label className={styles.password_block}>
              <input
                className={styles.input_password}
                type={wrong.disable ? "text" : "password"}
                required
                placeholder="Пароль"
                value={data.password}
                name="password"
                onChange={(e) =>
                  setDate((info) => ({ ...info, password: e.target.value }))
                }
              />
              {wrong.lookBtnEye && (
                <EyePassword
                  lookPassword={wrong.disable}
                  setDisable={setWrong}
                  type={"password_loginPage"}
                />
              )}
            </label>
            {wrong.errorlogin_password && (
              <label className={styles.errorlogin_password}>
                Неправильный логин или пароль
              </label>
            )}
            <button type="submit">Войти</button>
          </form>
          <span>Вы забыли пароль?</span>
          <button onClick={() => setRestore(true)}>Восстановить</button>
        </div>
      )}
    </>
  );
};

export default MainLogin;
