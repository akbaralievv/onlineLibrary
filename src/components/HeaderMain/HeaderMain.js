import React, { useEffect, useState } from "react";
import styles from "./HeaderMain.module.css";
import { NavLink } from "react-router-dom";
import NoveltiesSlider from "../Sliders/HeaderSliders/NoveltiesSlider/NoveltiesSlider";
import ManasPartSlider from "../Sliders/HeaderSliders/ManasPartSlider/ManasPartSlider";
import WritersSlider from "../Sliders/HeaderSliders/WritersSlider/WritersSlider";
import TheBestWorksSlider from "../Sliders/HeaderSliders/TheBestWorksSlider/TheBestWorksSlider";
import DownloadSlide from "../Sliders/HeaderSliders/DownloadSlide/DownloadSlide";

const HeaderMain = () => {
  const [slide, setSlide] = useState(0);
  const arrSlide = [
    <ManasPartSlider />,
    <NoveltiesSlider />,
    <WritersSlider />,
    <TheBestWorksSlider />,
    <DownloadSlide />,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide === arrSlide.length - 1 ? 0 : slide + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [slide]);

  return (
    <div className={styles.parent_header}>
      <div className="container">
        <div className={styles.child_header}>
          {arrSlide.map((item, index) => (
            <div
              className={index !== slide ? styles.none : ""}
              onClick={() => setSlide(index)}
              key={index}
            >
              {item}
            </div>
          ))}
          <div className={styles.btn_slider}>
            {arrSlide.map((item, index) => (
              <button
                onClick={() => setSlide(index)}
                className={slide === index ? styles.active_btn : ""}
                key={index}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
