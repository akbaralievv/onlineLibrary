import React, { useEffect, useState } from "react";
import styles from "./NoveltiesSlider.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestNovetlyWorks } from "../../../../store/reducers/sendRequestMainPageSlice";

const NoveltiesSlider = () => {
  const { dataNoveltyWork } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  // console.log(dataNoveltyWork, "dataNoveltyWork ");
  const data = [...dataNoveltyWork];
  data.length = 6;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestNovetlyWorks());
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
    }, 1000);
  };
  //////////////////////////////////////////

  return (
    <div className={styles.parent_Novelties}>
      <div>
        <h2>
          Следите за <span>новинками!</span>
        </h2>
      </div>
      <div className="container">
        <div>
          {data?.map((book) => (
            <div key={book.id}>
              <img src={book.cover} alt="book" />
            </div>
          ))}
        </div>
        <div className={styles.btn_more}>
          <button onClick={() => startScroll(2000)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default NoveltiesSlider;
