import React, { useState } from "react";
import styles from "./ManasPartSlider.module.css";
import manas from "../../../../assests/images/MainPage/ManasPart/manasPart_left.png";
import { useSelector } from "react-redux";

const ManasPartSlider = () => {
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
    }, 1000);
  };

  return (
    <div className={styles.parent_sliderManas}>
      <div>
        <h2>
          Эпос <span>Манас</span>
        </h2>
      </div>
      <div className={styles.child_sliderManas}>
        <div>
          <img src={manas} alt="#" />
        </div>
        <div>
          <p>
            Читайте вместе с <span>Muras</span> самый большой в мире Эпос
          </p>
        </div>
      </div>
      <div className={styles.btn_more}>
        <button onClick={() => startScroll(1340)} disabled={disabledBtn}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ManasPartSlider;
