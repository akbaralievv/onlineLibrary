import React, { useEffect } from "react";
import styles from "./TheBestWorks.module.css";
import { useDispatch, useSelector } from "react-redux";
import SlidersMainPage from "../Sliders/SlidersMainPage/SlidersMainPage";
import { requestBestWorks } from "../../store/reducers/sendRequestMainPageSlice";

const TheBestWorks = () => {
  const { dataBestWork } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestBestWorks());
  }, []);

  //   console.log(dataBestWork, "dataBestWork");
  return (
    <div className={styles.parent_theBest}>
      <div className={styles.child_theBest}>
        <div className={styles.mainText_theBest}>
          <h2>Лучшие произведения</h2>
        </div>
        <SlidersMainPage data={dataBestWork} />
      </div>
    </div>
  );
};

export default TheBestWorks;
