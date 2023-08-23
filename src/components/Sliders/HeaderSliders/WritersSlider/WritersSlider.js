import React, { useEffect, useState } from "react";
import styles from "./WritersSlider.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestKyrgyzWriters } from "../../../../store/reducers/sendRequestMainPageSlice";

const WritersSlider = () => {
  const { kyrgyzWriters } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestKyrgyzWriters());
  }, []);

  const [disabledBtn, setDisabledBtn] = useState(false);
  const [displayedWriters, setDisplayedWriters] = useState([]);

  let count = 0;

  const startScroll = (addCoordinates) => {
    setDisabledBtn(true);
    if (count < addCoordinates) {
      setTimeout(() => {
        count = count + 20;
        window.scrollTo({
          top: count,
        });
        startScroll(addCoordinates);
      }, 1);
    }
    setTimeout(() => {
      count = 0;
      setDisabledBtn(false);
    }, 2000);
  };

  useEffect(() => {
    const lookSizeDisplay = () => {
      if (window.innerWidth <= 1190) {
        setDisplayedWriters(kyrgyzWriters.slice(0, 3));
      } else {
        setDisplayedWriters(kyrgyzWriters.slice(0, 5));
      }
    };
    lookSizeDisplay();
    const handleResize = () => {
      lookSizeDisplay();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [kyrgyzWriters]);

  return (
    <div className={styles.parent_ourWriters}>
      <div>
        <h2>
          Наши <span>писатели</span>
        </h2>
      </div>
      <div className="container">
        <div>
          {displayedWriters.map((man) => (
            <div key={man.id}>
              <div className={styles.inner_img_ourWriters}>
                <img src={man.image} alt="book" />
              </div>
              <div className={styles.inner_text_ourWriters}>
                <h4>{man?.fullname}</h4>
                <p>{man?.date_of_birth}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btn_more}>
          <button onClick={() => startScroll(2615)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default WritersSlider;
