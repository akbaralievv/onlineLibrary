import React from "react";
import styles from "./LevelPassword.module.css";
import { useSelector } from "react-redux";

const LevelPassword = ({ passwordHave }) => {
  const { difficultPassword, difficultPassword_text } = useSelector(
    (state) => state.windowsSlice
  );
  //   console.log(difficultPassword, "difficultPassword");
  const difficult_Styles = {
    width: `${difficultPassword.width}px`,
    height: "12px",
    backgroundColor: `${difficultPassword.color}`,
    borderRadius: "8px",
  };
  return (
    <>
      {passwordHave.level && (
        <label className={styles.parent_levelPassword}>
          <div style={difficult_Styles}></div>
          <p>{difficultPassword_text}</p>
        </label>
      )}
      {passwordHave.descriptionLevel && (
        <b>
          Пароль должен содержать не менее восьми знаков, включать буквы, цифры
          и специальные символы
        </b>
      )}
    </>
  );
};

export default LevelPassword;
