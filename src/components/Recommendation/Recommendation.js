import React, { useEffect } from "react";
import styles from "./Recommendation.module.css";
import SlidersMainPage from "../Sliders/SlidersMainPage/SlidersMainPage";
import { useDispatch, useSelector } from "react-redux";
import { requestRecomBook } from "../../store/reducers/sendRequestMainPageSlice";

const Recommendation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestRecomBook());
  }, []);
  const { recommedationBookInfo } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  return (
    <div className={styles.parent_recommendation}>
      <div className={styles.child_recommendation}>
        <div className={styles.mainText_recommendation}>
          <h2>Рекомендуемые книги</h2>
        </div>
        <SlidersMainPage data={recommedationBookInfo} />
      </div>
    </div>
  );
};

export default Recommendation;
