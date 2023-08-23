import React from "react";
import styles from "./SliderRecommBlock.module.css";
import postImage from "../../../../assests/images/Sliders/book_slider.png";
import { Link } from "react-router-dom";

const SliderRecommBlock = ({ slide }) => {
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.postImage}>
        <img src={postImage} alt="postIMAGE" />
      </div>
      <section>
        <div className={styles.postText}>
          <h2>{slide.title}</h2>
          <p>{slide.writer}</p>
        </div>
        <div className={styles.rating_star}></div>
        <button>
          <Link to={"/"}>Читать</Link>
        </button>
      </section>
    </div>
  );
};

export default SliderRecommBlock;
