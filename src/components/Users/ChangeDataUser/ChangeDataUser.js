import React, { useEffect, useState } from "react";
import styles from "./ChangeDataUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeDataUser } from "../../../store/reducers/windowsSlice";
import {
  changeFakeData,
  sendRequestDataEveryUser,
} from "../../../store/reducers/usersStateSlice";
import EyePassword from "../../Authorization/EyePassword/EyePassword";
// import { changeDataUser } from "../../helpers/helpers";

const ChangeDataUser = ({ setUser, user }) => {
  const dispatch = useDispatch();
  const [change, setChange] = useState({
    password: "",
    new_password: "",
    repeatNew_password: "",
    name: "",
    language: "",
    email: "",
  });
  // const [data, setData] = useState(
  //   JSON.parse(localStorage.getItem("dataUser"))
  // );
  const [passwords, setPasswords] = useState({
    lookBtn_password: false,
    disable_password: false,
    lookBtn_passwordRepeat: false,
    disable_passwordRepeat: false,
    lookBtn_passwordNewRepeat: false,
    disable_passwordNewRepeat: false,
  });

  // console.log(data.password);
  useEffect(() => {
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")));
  }, []);

  useEffect(() => {
    if (change.password === "") {
      setPasswords((info) => ({
        ...info,
        lookBtn_password: false,
      }));
    } else {
      setPasswords((info) => ({
        ...info,
        lookBtn_password: true,
      }));
    }
  }, [change]);
  useEffect(() => {
    if (change.new_password === "") {
      setPasswords((info) => ({
        ...info,
        lookBtn_passwordRepeat: false,
      }));
    } else {
      setPasswords((info) => ({
        ...info,
        lookBtn_passwordRepeat: true,
      }));
    }
  }, [change]);
  useEffect(() => {
    if (change.repeatNew_password === "") {
      setPasswords((info) => ({
        ...info,
        lookBtn_passwordNewRepeat: false,
      }));
    } else {
      setPasswords((info) => ({
        ...info,
        lookBtn_passwordNewRepeat: true,
      }));
    }
  }, [change]);

  const sendRequest = (type) => {
    dispatch(changeDataUser({ type: type, change: change }));
    setUser((info) => ({
      ...info,
      windowsChange: false,
    }));
    // 1 - name
    // 2 - язык
    // 3 - email
    // 4 - password
    // 5 - img
    if (type === 1) {
      dispatch(
        changeFakeData({
          type: 1,
          name: change.name,
        })
      );
    } else if (type === 3) {
      dispatch(
        changeFakeData({
          type: 3,
          email: change.email,
        })
      );
    } else if (type === 4) {
      dispatch(
        changeFakeData({
          type: 4,
          password: change.new_password,
        })
      );
    }
    ///////////////////////
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")));
  };
  if (user.choiceData === 1) {
    return (
      <>
        <div
          className={styles.back_shadow_changeData}
          onClick={() =>
            setUser((info) => ({
              ...info,
              windowsChange: false,
            }))
          }
        ></div>
        <div className={styles.parent_changeData}>
          <div>
            <h6>Изменить отображаемое имя</h6>
            <p>Отображаемое имя</p>
            <form onSubmit={() => sendRequest(user.choiceData)}>
              <input
                onChange={(e) =>
                  setChange((info) => ({
                    ...info,
                    name: e.target.value,
                  }))
                }
                placeholder="Джумабеков Нурдин"
                required
              />
              <div>
                <button
                  onClick={() =>
                    setUser((info) => ({
                      ...info,
                      windowsChange: false,
                    }))
                  }
                >
                  Отмена
                </button>
                <button type="submit">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (user.choiceData === 3) {
    return (
      <>
        <div
          className={styles.back_shadow_changeData}
          onClick={() =>
            setUser((info) => ({
              ...info,
              windowsChange: false,
            }))
          }
        ></div>
        <div className={styles.parent_changeData}>
          <div>
            <h6>Изменить электронную почту</h6>
            <p>Введите новую лектронную почту</p>
            <form onSubmit={() => sendRequest(user.choiceData)}>
              <input
                type="email"
                onChange={(e) =>
                  setChange((info) => ({
                    ...info,
                    email: e.target.value,
                  }))
                }
                placeholder="E-mail "
                required
              />
              <p>Введите пароль</p>
              <label className={styles.lookBtn}>
                <input
                  onChange={(e) =>
                    setChange((info) => ({
                      ...info,
                      password: e.target.value,
                    }))
                  }
                  placeholder="пароль"
                  required
                  type={passwords.disable_password ? "text" : "password"}
                />
                {passwords.lookBtn_password && (
                  <EyePassword
                    lookPassword={passwords.disable_password}
                    setDisable={setPasswords}
                    type={"setting_changeEmail"}
                  />
                )}
              </label>
              <div>
                <button
                  onClick={() =>
                    setUser((info) => ({
                      ...info,
                      windowsChange: false,
                    }))
                  }
                >
                  Отмена
                </button>
                <button type="submit">Изменить</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (user.choiceData === 4) {
    return (
      <>
        <div
          className={styles.back_shadow_changeData}
          onClick={() =>
            setUser((info) => ({
              ...info,
              windowsChange: false,
            }))
          }
        ></div>
        <div className={styles.parent_changeData}>
          <div>
            <h6>Изменить пароль</h6>
            <p>Введите действующий пароль</p>
            <form onSubmit={() => sendRequest(user.choiceData)}>
              <label className={styles.lookBtn}>
                <input
                  onChange={(e) =>
                    setChange((info) => ({
                      ...info,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*****************"
                  required
                  type={passwords.disable_password ? "text" : "password"}
                />
                {passwords.lookBtn_password && (
                  <EyePassword
                    lookPassword={passwords.disable_password}
                    setDisable={setPasswords}
                    type={"setting_changeEmail"}
                  />
                )}
              </label>
              <p>Введите новый пароль</p>
              <label className={styles.lookBtn}>
                <input
                  onChange={(e) =>
                    setChange((info) => ({
                      ...info,
                      new_password: e.target.value,
                    }))
                  }
                  placeholder="*****************"
                  required
                  type={passwords.disable_passwordRepeat ? "text" : "password"}
                />
                {passwords.lookBtn_passwordRepeat && (
                  <EyePassword
                    lookPassword={passwords.disable_passwordRepeat}
                    setDisable={setPasswords}
                    type={"setting_changeNewPassword"}
                  />
                )}
              </label>
              <p>Повторите новый пароль</p>
              <label className={styles.lookBtn}>
                <input
                  onChange={(e) =>
                    setChange((info) => ({
                      ...info,
                      repeatNew_password: e.target.value,
                    }))
                  }
                  placeholder="*****************"
                  required
                  type={
                    passwords.disable_passwordNewRepeat ? "text" : "password"
                  }
                />
                {passwords.lookBtn_passwordNewRepeat && (
                  <EyePassword
                    lookPassword={passwords.disable_passwordNewRepeat}
                    setDisable={setPasswords}
                    type={"setting_changeNewPassword_repreat"}
                  />
                )}
              </label>
              <div>
                <button
                  onClick={() =>
                    setUser((info) => ({
                      ...info,
                      windowsChange: false,
                    }))
                  }
                >
                  Отмена
                </button>
                <button type="submit">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default ChangeDataUser;
