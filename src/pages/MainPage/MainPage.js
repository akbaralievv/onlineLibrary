import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import Recommendation from "../../components/Recommendation/Recommendation";
import ManasPart from "../../components/ManasPart/ManasPart";
import Sliders_writers from "../../components/Sliders/Sliders_writers/Sliders_writers";
import Novelties from "../../components/Novelties/Novelties";
import TheBestWorks from "../../components/TheBestWorks/TheBestWorks";
import DownloadSlide from "../../components/Sliders/HeaderSliders/DownloadSlide/DownloadSlide";
import Preloader from "../../components/Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import {
  changePreloader,
  requestNovetlyWorks,
} from "../../store/reducers/sendRequestMainPageSlice";
const MainPage = () => {
  const { preloader } = useSelector((state) => state.sendRequestMainPageSlice);
  const dispatch = useDispatch();
  // console.log(preloader);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(requestNovetlyWorks());
    dispatch(changePreloader(false));
  }, []);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.inner_wrapper}>
          <HeaderMain />
          <Recommendation />
          <ManasPart />
          <Novelties />
          <Sliders_writers />
          <TheBestWorks />
          <div className={styles.parent_downloadSlide}>
            <DownloadSlide />,
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
