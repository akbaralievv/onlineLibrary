import React, { useEffect, useState } from "react";
import styles from "./MainRegistration.module.css";
import { useDispatch, useSelector } from "react-redux";
import LevelPassword from "../LevelPassword/LevelPassword";
import {
  changeDifficultPassword,
  changeDifficultPassword_text,
  changePreloader,
  repeatSendRequestMessageEmail,
} from "../../../store/reducers/windowsSlice";
import EyePassword from "../EyePassword/EyePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";

const MainRegistration = () => {
  const { preloader } = useSelector((state) => state.windowsSlice);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState({
    checkOutBtn: false,
    lookPassword: false,
    lookPasswordPepeat: false,
    lookBtnEye: false,
    lookBtnEyeRepeat: false,
  });
  // console.log(disable.lookBtnEyeRepeat, "lookBtnEyeRepeat");
  const [sendError, setSendError] = useState({
    sendErrorEmail: false,
    sendErrorPassword: false,
    sendErrorPassword_repeat: false,
  });
  const [password, setPassword] = useState({
    passwordMain: "",
    passwordRepeat: "",
  });
  const [passwordHave, setPasswordHave] = useState({
    level: false,
    descriptionLevel: false,
    repeatPassword: true,
  });
  const navigate = useNavigate();

  const textRegExp = /[a-zA-Z]/;
  const numRegExp = /[0-9]/;
  const symboltRegExp = /[!@#$%+^/()?\-&.,_*]/;
  const gmailRegExp_1 = /^[A-Za-z0-9_\-\.\-]+\@[gmail]+\.com$/;

  useEffect(() => {
    if (password.passwordMain === "") {
      setPasswordHave({ level: false });
      setDisable((info) => ({ ...info, lookBtnEye: false }));
    } else if (password.passwordMain.length !== 0) {
      setPasswordHave({ level: true });
      setDisable((info) => ({ ...info, lookBtnEye: true }));
      if (
        password.passwordMain.length >= 8 &&
        numRegExp.test(password.passwordMain) &&
        textRegExp.test(password.passwordMain)
      ) {
        dispatch(changeDifficultPassword({ width: 140, color: "yellow" }));
        dispatch(changeDifficultPassword_text("Хороший пароль"));
        if (
          password.passwordMain.length >= 8 &&
          symboltRegExp.test(password.passwordMain) &&
          numRegExp.test(password.passwordMain) &&
          textRegExp.test(password.passwordMain)
        ) {
          dispatch(changeDifficultPassword({ width: 210, color: "green" }));
          dispatch(changeDifficultPassword_text("Сложный пароль"));
        }
      } else if (password.passwordMain.length < 8) {
        dispatch(changeDifficultPassword({ width: 70, color: "red" }));
        dispatch(changeDifficultPassword_text("Слабый пароль"));
      } else if (
        password.passwordMain.length >= 8 &&
        numRegExp.test(password.passwordMain) &&
        symboltRegExp.test(password.passwordMain)
      ) {
        dispatch(changeDifficultPassword({ width: 140, color: "yellow" }));
        dispatch(changeDifficultPassword_text("Хороший пароль"));
      } else if (
        password.passwordMain.length >= 8 &&
        textRegExp.test(password.passwordMain) &&
        symboltRegExp.test(password.passwordMain)
      ) {
        dispatch(changeDifficultPassword({ width: 140, color: "yellow" }));
        dispatch(changeDifficultPassword_text("Хороший пароль"));
      }
    }
    if (password.passwordRepeat === "") {
      setDisable((info) => ({ ...info, lookBtnEyeRepeat: false }));
    } else if (password.passwordRepeat.length !== 0) {
      setDisable((info) => ({ ...info, lookBtnEyeRepeat: true }));
    }
  }, [password]);
  const sendRequestRegistration = async () => {
    dispatch(changePreloader(true));
    try {
      const data = await axios({
        method: "POST",
        url: "https://kitepkana1.pythonanywhere.com/auth/users/",
        data: {
          username: "user",
          email: email,
          password: password.passwordMain,
          re_password: password.passwordRepeat,
        },
      });
      // console.log(data, "sendRequestRegistration");
      navigate("/registration_active");
      localStorage.setItem("temporaryEmail", email);
      localStorage.setItem("temporaryPassword", password.passwordMain);
      setTimeout(() => {
        dispatch(changePreloader(false));
      }, 1500);
    } catch (error) {
      dispatch(changePreloader(false));
      if (
        error.response.data.email &&
        error.response.data.email[0] === "user with this email already exists."
      ) {
        navigate("/registration_active");
        dispatch(repeatSendRequestMessageEmail(email));
      } else {
        console.log(error, "error send registration");
      }
    } //error.response.data.email
  };

  const regExpCheckFN = (e) => {
    e.preventDefault();
    if (gmailRegExp_1.test(email)) {
      // console.log(email);
      if (
        password.passwordMain.length >= 8 &&
        symboltRegExp.test(password.passwordMain) &&
        numRegExp.test(password.passwordMain) &&
        textRegExp.test(password.passwordMain)
      ) {
        // console.log(password.passwordMain);
        if (password.passwordMain === password.passwordRepeat) {
          console.log("Пароли похожи");
          sendRequestRegistration();
        } else {
          // console.log("Пароли не похожи");
          setSendError({ sendErrorPassword_repeat: true });
          setTimeout(() => {
            setSendError({ sendErrorPassword_repeat: false });
          }, 2000);
        }
      } else {
        // console.log("password error!!");
        setSendError({ sendErrorPassword: true });
        setTimeout(() => {
          setSendError({ sendErrorPassword: false });
        }, 2000);
      }
    } else {
      // console.log("некорректные данные");
      setSendError({ sendErrorEmail: true });
      setTimeout(() => {
        setSendError({ sendErrorEmail: false });
      }, 2000);
    }
  };

  const appearanceLevelInfo = (type) => {
    if (type === "passwordMain") {
      if (password.passwordMain.length === 0) {
        setPasswordHave({ descriptionLevel: true });
      } else if (password.passwordMain.length !== 0) {
        setPasswordHave({ descriptionLevel: false });
        setPasswordHave({ level: true });
        setDisable((info) => ({ ...info, lookBtnEye: true }));
      }
    } else if (type === "passwordRepeat") {
      if (password.passwordRepeat.length !== 0) {
        setDisable((info) => ({ ...info, lookBtnEyeRepeat: true }));
      }
    }
  };
  const removeLevelInfo = (e) => {
    if (e.target.tagName !== "INPUT") {
      setPasswordHave({ descriptionLevel: false });
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", removeLevelInfo);
    dispatch(changePreloader(false));
  }, []);
  // useEffect(() => {
  //   if (password.passwordMain === password.passwordRepeat) {
  //     console.log("goooo");
  //   } else if (password.passwordMain !== password.passwordRepeat) {
  //     console.log("noooo");
  //   }
  // }, [password.passwordRepeat]);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.parent_refistration}>
          <form action="" onSubmit={regExpCheckFN}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className={styles.registration_Email}
              name="nn"
            />
            {sendError.sendErrorEmail && (
              <label
                className={styles.label_emailError}
                onClick={() => setSendError({ sendErrorEmail: false })}
              >
                Некорректный Email
              </label>
            )}
            <label className={styles.block_password_look}>
              <input
                type={disable.lookPassword ? "text" : "password"}
                placeholder="Пароль "
                required
                onChange={(e) =>
                  setPassword((info) => ({
                    ...info,
                    passwordMain: e.target.value,
                  }))
                }
                onClick={() => appearanceLevelInfo("passwordMain")}
              />
              {disable.lookBtnEye && (
                <EyePassword
                  lookPassword={disable.lookPassword}
                  setDisable={setDisable}
                  type={"passwordMain"}
                />
              )}
            </label>
            {sendError.sendErrorPassword && (
              <label
                className={styles.label_passwordError}
                onClick={() => setSendError({ sendErrorPassword: false })}
              >
                Придумайте сложный пароль!!!
              </label>
            )}
            <LevelPassword passwordHave={passwordHave} />
            <label className={styles.block_passwordRepeat_look}>
              <input
                type={disable.lookPasswordPepeat ? "text" : "password"}
                placeholder="Введите пароль еще раз"
                required
                onChange={(e) =>
                  setPassword((info) => ({
                    ...info,
                    passwordRepeat: e.target.value,
                  }))
                }
                onClick={() => appearanceLevelInfo("passwordRepeat")}
              />
              {disable.lookBtnEyeRepeat && (
                <EyePassword
                  lookPassword={disable.lookPasswordPepeat}
                  setDisable={setDisable}
                  type={"passwordRepeat"}
                />
              )}
            </label>

            {sendError.sendErrorPassword_repeat && (
              <label
                className={styles.label_passwordError_repeat}
                onClick={() =>
                  setSendError({ sendErrorPassword_repeat: false })
                }
              >
                Пароли не совпадают!!!
              </label>
            )}
            <label className={styles.block_checkbox}>
              <input
                type="checkbox"
                onClick={() =>
                  setDisable((info) => ({
                    ...info,
                    checkOutBtn: !disable.checkOutBtn,
                  }))
                }
              />
              <label>
                <span>я прочитал и согласен с</span>
                <span>Правилами Пользования и Политикой Конфидециальности</span>
              </label>
            </label>
            <button
              disabled={!disable.checkOutBtn}
              className={disable.checkOutBtn ? "" : styles.shadow_btn}
              onClick={(e) => regExpCheckFN(e)}
              type="submit"
            >
              Зарегестрироваться
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MainRegistration;
