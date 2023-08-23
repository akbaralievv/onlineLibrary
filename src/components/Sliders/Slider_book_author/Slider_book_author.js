import React from "react";
import styles from "./Slider_book_author.module.css";
import SlidersMainPage from "../SlidersMainPage/SlidersMainPage";

const Slider_book_author = ({ data }) => {
  return (
    <div className={styles.parent_sliderWriter}>
      <div className={styles.child_sliderWriter}>
        <div className={styles.mainText_sliderWriter}>
          <h2>Произведения писателя</h2>
        </div>
        <SlidersMainPage data={data} />
      </div>
    </div>
  );
};

export default Slider_book_author;
