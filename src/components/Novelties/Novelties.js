import React, { useEffect } from "react";
import styles from "./Novelties.module.css";
import { useDispatch, useSelector } from "react-redux";
import SlidersMainPage from "../Sliders/SlidersMainPage/SlidersMainPage";
import { requestNovetlyWorks } from "../../store/reducers/sendRequestMainPageSlice";

const Novelties = () => {
  const { dataNoveltyWork } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  // console.log(dataNoveltyWork, "dataNoveltyWork");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestNovetlyWorks());
  }, []);

  return (
    <div className={styles.parent_novelties}>
      <div className={styles.child_novelties}>
        <div className={styles.mainText_novelties}>
          <h2>Новинки</h2>
        </div>
        <SlidersMainPage data={dataNoveltyWork} />
      </div>
    </div>
  );
};

export default Novelties;
