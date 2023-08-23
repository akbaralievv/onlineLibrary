import React, { useState } from "react";
import styles from "./RecoveryAccount.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changePreloader,
  resetPassword,
} from "../../../store/reducers/windowsSlice";
import Preloader from "../../Preloader/Preloader";
import SendRecovery from "../../Animation/SendRecovery/SendRecovery";

const RecoveryAccount = ({ setRestore }) => {
  const dispatch = useDispatch();
  const { preloader } = useSelector((state) => state.windowsSlice);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [bordersend, setBordersend] = useState(false);
  const sendRequestResetPassword = (e) => {
    e.preventDefault();
    setBordersend(true);
    setTimeout(() => {
      setBordersend(false);
    }, 2500);
    setTimeout(() => {
      // dispatch(changePreloader(true));
    }, 1500);
    dispatch(resetPassword(data));
    setTimeout(() => {
      setRestore(false);
      // dispatch(changePreloader(false));
    }, 2500);
  };
  // console.log(data);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.parentBlock_recovery}>
          <form action="" onSubmit={sendRequestResetPassword}>
            <input
              placeholder="E-mail "
              className={styles.input_email_recover}
              type="email"
              required
              onChange={(e) =>
                setData((info) => ({ ...info, email: e.target.value }))
              }
            />
            <label className={styles.text_recovery}>
              Мы сбросим пароль на вашу почту
            </label>
            <label className={styles.blockForAnimation}>
              <button type="submit">Отправить</button>
              {bordersend && <SendRecovery />}
            </label>
          </form>
        </div>
      )}
    </>
  );
};

export default RecoveryAccount;
