import React, { useEffect, useState } from "react";
import styles from "./DataEveryUser.module.css";
import { useSelector } from "react-redux";

const DataEveryUser = () => {
  const [data, seData] = useState({});
  useEffect(() => {
    seData(JSON.parse(localStorage.getItem("dataUser")));
  }, []);
  // console.log(data, "data");
  const { stateFake } = useSelector((state) => state.usersStateSlice);
  // console.log(stateFake?.img);

  return (
    <div className={styles.parent_veryUser}>
      <div>
        <img
          src={stateFake?.img === "" ? data?.user_photo : stateFake?.img}
          alt="Картинка"
        />
      </div>
      <p>{stateFake?.name === "" ? data?.username : stateFake?.name}</p>
      <span>{stateFake?.email === "" ? data?.email : stateFake?.email}</span>
    </div>
  );
};

export default DataEveryUser;
