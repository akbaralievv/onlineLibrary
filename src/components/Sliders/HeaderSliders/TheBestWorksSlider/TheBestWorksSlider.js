import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TheBestWorksSlider.module.css";
import { requestBestWorks } from "../../../../store/reducers/sendRequestMainPageSlice";

const TheBestWorksSlider = () => {
  const { dataBestWork } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  // console.log(dataBestWork, "dataBestWork");
  const data = [...dataBestWork];
  data.reverse().length = 3;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestBestWorks());
  }, []);

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
    <div className={styles.parent_bestWork}>
      <div>
        <h2>
          Лучшие <span>произведения</span>
        </h2>
      </div>
      <div className="container">
        <div>
          {data?.map((book) => (
            <div key={book.id}>
              <div className={styles.inner_img_ourWriters}>
                <img src={book.cover} alt="book" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btn_more}>
          <button onClick={() => startScroll(3250)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default TheBestWorksSlider;
