import React, { useState, useEffect } from "react";
import styles from "./UserLogin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  changeCheckedUser,
  sendRequestDataEveryUser,
} from "../../store/reducers/usersStateSlice";
import { useDispatch, useSelector } from "react-redux";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const { checkedUser, dataEveryUser } = useSelector(
    (state) => state.usersStateSlice
  );
  const { preloader } = useSelector((state) => state.windowsSlice);
  const [data, setData] = useState(null);
  const addBtnLogin = () => {
    navigate("/login");
  };
  // console.log(data);
  useEffect(() => {
    if (access) {
      dispatch(sendRequestDataEveryUser(access));
      setTimeout(() => {
        dispatch(changeCheckedUser(true));
      }, 500);
      setData(JSON.parse(localStorage.getItem("dataUser")));
    } else {
      dispatch(changeCheckedUser(false));
    }
    // console.log(localStorage.getItem("dataUser"));
  }, [preloader]);

  const { stateFake } = useSelector((state) => state.usersStateSlice);

  return (
    <div className={styles.parent_UserLogin}>
      {/* {console.log(checkedUser, "checkedUser")} */}
      {checkedUser ? (
        <NavLink to={"/profile"}>
          {data ? (
            <div>
              <p>{stateFake?.name === "" ? data?.username : stateFake?.name}</p>
              <div>
                <img
                  src={
                    stateFake?.img === "" ? data?.user_photo : stateFake?.img
                  }
                  alt="user"
                />
              </div>
            </div>
          ) : (
            <div>
              <p>
                {stateFake?.name === ""
                  ? dataEveryUser?.username
                  : stateFake?.name}
              </p>
              <div>
                <img
                  src={
                    stateFake?.img === ""
                      ? dataEveryUser?.user_photo
                      : stateFake?.img
                  }
                  alt="user"
                />
              </div>
            </div>
          )}
        </NavLink>
      ) : (
        <button onClick={addBtnLogin}>Вход</button>
      )}
    </div>
  );
};

export default UserLogin;
