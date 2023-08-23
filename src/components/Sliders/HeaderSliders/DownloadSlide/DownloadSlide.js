import React, { useState } from "react";
import styles from "./DownloadSlide.module.css";
import left from "../../../../assests/images/MainPage/Header/left_phone.png";
import center from "../../../../assests/images/MainPage/Header/center_phone.png";
import right from "../../../../assests/images/MainPage/Header/right_phone.png";
import { useSelector } from "react-redux";

const DownloadSlide = () => {
  //////////////////////////////////////////
  const { coordinatesSlider } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );

  // console.log(coordinatesSlider[0], "coordinatesSlider");

  const [disabledBtn, setDisabledBtn] = useState(false);
  let count = 0;
  const startScroll = (addCoordinates) => {
    setDisabledBtn(true);
    if (count < addCoordinates) {
      setTimeout(() => {
        count = count + 20;
        window.scrollTo({
          top: count,
        });
        // console.log(count);
        startScroll(addCoordinates);
      }, 1);
    }
    setTimeout(() => {
      count = 0;
      setDisabledBtn(false);
    }, 2000);
  };
  //////////////////////////////////////////
  return (
    <div className={styles.parent_download}>
      <div className={styles.child_imgs_download}>
        <div>
          <img src={left} alt="left" />
        </div>
        <div>
          <img src={center} alt="center" />
        </div>
        <div>
          <img src={right} alt="right" />
        </div>
      </div>
      <div className={styles.child_text_download}>
        <p>
          <span>Нажмите здесь</span>, чтобы перейти на мобильную версию сайта.
        </p>
        <button onClick={() => startScroll(3800)}>Скачать</button>
      </div>
    </div>
  );
};

export default DownloadSlide;
