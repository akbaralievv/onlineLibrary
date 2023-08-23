import React, { useEffect, useState } from "react";
import styles from "./SlidersMainPageInner.module.css";
import { Link, NavLink } from "react-router-dom";
import Rating_Star from "../Rating_Star/Rating_Star";

const SlidersMainPageInner = ({ slide }) => {
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.postImage}>
        <img src={slide?.cover} alt="postIMAGE" />
      </div>
      <section>
        <div className={styles.postText}>
          <h2>{slide.title}</h2>
          <p>{slide.author_name}</p>
        </div>
        <div className={styles.rating_Star}>
          <Rating_Star
            grade_star={slide?.middle_star}
            grade={slide?.middle_star}
          />
          {/* Для адавтивки */}
          <p className={styles.content_adaptaion}>{slide?.author_name}</p>
          {/* Для адавтивки */}
        </div>
        <Link to={`/detailed/${slide?.id}`}>
          <button>Читать</button>
        </Link>
      </section>
      {/* <NavLink
        to={`/detailed/${slide?.id}`}
        className={styles.modile_version}
      ></NavLink> */}
    </div>
  );
};

export default SlidersMainPageInner;
