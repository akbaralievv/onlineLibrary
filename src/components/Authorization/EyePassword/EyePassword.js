import React from "react";
import styles from "./EyePassword.module.css";
import eye_off from "../../../assests/images/windows/eye-off.svg";
import eye_on from "../../../assests/images/windows/eye-on.svg";

const EyePassword = ({ lookPassword, setDisable, type }) => {
  if (type === "passwordMain") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, lookPassword: false }))
            }
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, lookPassword: true }))
            }
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  } else if (type === "passwordRepeat") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, lookPasswordPepeat: false }))
            }
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, lookPasswordPepeat: true }))
            }
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  } else if (type === "password_loginPage") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() => setDisable((info) => ({ ...info, disable: false }))}
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() => setDisable((info) => ({ ...info, disable: true }))}
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  } else if (type === "setting_changeEmail") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, disable_password: false }))
            }
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, disable_password: true }))
            }
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  } else if (type === "setting_changeNewPassword") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, disable_passwordRepeat: false }))
            }
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() =>
              setDisable((info) => ({ ...info, disable_passwordRepeat: true }))
            }
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  } else if (type === "setting_changeNewPassword_repreat") {
    return (
      <label className={styles.parent_eyeBtn}>
        {lookPassword ? (
          <div
            onClick={() =>
              setDisable((info) => ({
                ...info,
                disable_passwordNewRepeat: false,
              }))
            }
          >
            <img src={eye_on} alt="eye" />
          </div>
        ) : (
          <div
            onClick={() =>
              setDisable((info) => ({
                ...info,
                disable_passwordNewRepeat: true,
              }))
            }
          >
            <img src={eye_off} alt="eye" />
          </div>
        )}
      </label>
    );
  }
};

export default EyePassword;
