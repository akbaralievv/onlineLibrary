import React, { useEffect, useRef, useState } from "react";
import styles from "./ManasPart.module.css";
import { NavLink } from "react-router-dom";
import manas_left from "../../assests/images/MainPage/ManasPart/manasPart_left.png";
import manas_right from "../../assests/images/MainPage/ManasPart/manasPart_right.png";
import manas_book from "../../assests/images/MainPage/ManasPart/manas_book.png";
import { useDispatch } from "react-redux";
import { addCoordinatesSlider } from "../../store/reducers/sendRequestMainPageSlice";

const ManasPart = () => {
  const dispatch = useDispatch();
  const data_Ref = useRef(null);
  useEffect(() => {
    const { top } = data_Ref.current.getBoundingClientRect();
    // console.log(top,"top");
    setTimeout(() => {
      dispatch(addCoordinatesSlider(top + 150));
    }, 100);
  }, []);

  return (
    <div className={styles.parent_manasPart} ref={data_Ref}>
      <h4>Манас</h4>
      <div className={styles.child_manasPart}>
        <div className={styles.child_manasPart_left}>
          <img src={manas_left} alt="manas_left" />
        </div>
        <div className={styles.child_manasPart_center}>
          <div>
            <div>
              <img src={manas_book} alt="manas_book" />
            </div>
            <div>
              <p>
                Начните изучать и читать с легендарного , самого большого в мире
                эпоса - “<span>МАНАС</span>”
              </p>
              <button>
                <NavLink to={"/detailed/7"}>Подробнее</NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.child_manasPart_right}>
          <img src={manas_right} alt="manas_right" />
        </div>
      </div>
    </div>
  );
};

export default ManasPart;
