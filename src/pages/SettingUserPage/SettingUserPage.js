import React, { useEffect, useRef, useState } from "react";
import styles from "./SettingUserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import ChangeDataUser from "../../components/Users/ChangeDataUser/ChangeDataUser";
import LogOut from "../../components/Authorization/LogOut/LogOut";
import editImg from "../../assests/images/Setting/edit_photo.svg";
import { sendRequestEditUserPhoto } from "../../store/reducers/windowsSlice";
import {
  changeFakeData,
  sendRequestDataEveryUser,
} from "../../store/reducers/usersStateSlice";
import { NavLink } from "react-router-dom";

const SettingUserPage = () => {
  const { goodChangeData } = useSelector((state) => state.windowsSlice);
  const { dataEveryUser, stateFake, singlePassword } = useSelector(
    (state) => state.usersStateSlice
  );
  // console.log(stateFake);

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    choiceData: 0,
    windowsChange: false,
  });

  useEffect(() => {
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")));
  }, [user, stateFake]);
  // console.log(password);
  // console.log(dataEveryUser);
  // const convertPassword = (info) => {
  //   // console.log(info);
  //   const startInfo = info?.slice(0, info?.length - 2);
  //   const endInfo = info?.slice(info?.length - 2);
  //   // console.log(startInfo);
  //   // console.log(endInfo);
  //   const result =
  //     startInfo
  //       ?.split("")
  //       .map((i) => {
  //         return (i = "*");
  //       })
  //       ?.join()
  //       ?.replace(/,/g, "") + endInfo;
  //   // console.log(result);
  //   setPassword(result);
  // };
  // useEffect(() => {
  //   convertPassword(dataEveryUser?.password);
  // }, []);

  const userInfo = [
    {
      id: 1,
      title: "Отображаемое имя",
      content:
        stateFake?.name === "" ? dataEveryUser?.username : stateFake.name,
      btn: "Изменить",
    },
    {
      id: 2,
      title: "Язык сайта",
      content: "Русский",
      btn: "Изменить",
    },
    {
      id: 3,
      title: "Электронная почта",
      content: stateFake.email === "" ? dataEveryUser?.email : stateFake.email,
      btn: "Изменить",
    },
    {
      id: 4,
      title: "Пароль",
      content: stateFake?.password === "" ? singlePassword : stateFake.password,
      btn: "Изменить",
    },
  ];

  const changeStateUser = (type) => {
    setUser((info) => ({
      ...info,
      windowsChange: true,
      choiceData: type,
    }));
  };

  const inputRef = useRef(null);
  const openImages = () => {
    inputRef.current.click();
  };
  const handlePhotoChange = (e) => {
    dispatch(sendRequestEditUserPhoto(e.target.files[0]));
    dispatch(
      changeFakeData({
        img: URL.createObjectURL(e.target.files[0]),
        type: 5,
      })
    );
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")));
  };
  return (
    <>
      <div className={styles.parent_settingUser}>
        <section>
          <NavLink to={"/profile"}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.6654 9.66732H5.3987L12.8654 2.20065L10.9987 0.333984L0.332031 11.0007L10.9987 21.6673L12.8654 19.8007L5.3987 12.334H21.6654V9.66732Z"
                fill="#2A2A2A"
              />
            </svg>
            <p>Информация об аккаунте</p>
          </NavLink>
        </section>
        <div className="container">
          <div className={styles.child_settingUser}>
            <div className={styles.nameUser_settingUser}>
              <div>
                <img
                  src={
                    stateFake.img === ""
                      ? dataEveryUser?.user_photo
                      : stateFake.img
                  }
                  alt="*"
                />
                <button onClick={() => openImages()}>
                  <input
                    ref={inputRef}
                    className={styles.input_addPhoto}
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  <img src={editImg} alt="edit" />
                </button>
              </div>
              <div>
                <span>
                  {stateFake?.name === ""
                    ? dataEveryUser?.username
                    : stateFake?.name}
                </span>
              </div>
            </div>
            <div className={styles.infoUser_settingUser}>
              {userInfo?.map((info) => (
                <div key={info.id}>
                  <div>
                    <p>{info?.title}</p>
                    <h6>{info?.content}</h6>
                  </div>
                  <button onClick={() => changeStateUser(info.id)}>
                    {info?.btn}
                  </button>
                </div>
              ))}
            </div>
            {user.windowsChange && (
              <ChangeDataUser setUser={setUser} user={user} />
            )}
            {goodChangeData && (
              <div className={styles.goodChange}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7435 12.9414C24.2631 12.4196 24.2613 11.5754 23.7394 11.0558C23.2176 10.5362 22.3734 10.5381 21.8538 11.0599L14.1607 18.7863L9.73485 14.422C9.21051 13.905 8.36631 13.9109 7.84927 14.4353C7.33224 14.9596 7.33815 15.8038 7.86249 16.3208L13.2331 21.6167C13.7557 22.132 14.5963 22.1281 15.1141 21.6081L23.7435 12.9414Z"
                    fill="#06A503"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.9987 1.33398C7.89852 1.33398 1.33203 7.90047 1.33203 16.0007C1.33203 24.1008 7.89852 30.6673 15.9987 30.6673C24.0989 30.6673 30.6654 24.1008 30.6654 16.0007C30.6654 7.90047 24.0989 1.33398 15.9987 1.33398ZM3.9987 16.0007C3.9987 9.37323 9.37128 4.00065 15.9987 4.00065C22.6261 4.00065 27.9987 9.37323 27.9987 16.0007C27.9987 22.6281 22.6261 28.0006 15.9987 28.0006C9.37128 28.0006 3.9987 22.6281 3.9987 16.0007Z"
                    fill="#06A503"
                  />
                </svg>
                <p>Изменения сохранены</p>
              </div>
            )}
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingUserPage;
