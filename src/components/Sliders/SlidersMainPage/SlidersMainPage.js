import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./SlidersMainPage.module.css";
import SlidersMainPageInner from "./SlidersMainPageInner/SlidersMainPageInner";
import { NavLink } from "react-router-dom";

const SlidersMainPage = ({ data }) => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900 && window.innerWidth > 650) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 650) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slidesToShow]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };

  return (
    <div className={styles.slider}>
      <Slider {...settings}>
        {data?.map((slide) => (
          <SlidersMainPageInner slide={slide} key={slide.id} />
        ))}
      </Slider>
      <div className={styles.all_books}>
        <NavLink to={"/library"}>
          <p>Все книги</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79289 6.29289C9.18342 5.90237 9.81658 5.90237 10.2071 6.29289L15.2071 11.2929C15.5976 11.6834 15.5976 12.3166 15.2071 12.7071L10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071C8.40237 17.3166 8.40237 16.6834 8.79289 16.2929L13.0858 12L8.79289 7.70711C8.40237 7.31658 8.40237 6.68342 8.79289 6.29289Z"
              fill="#2A2A2A"
            />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default SlidersMainPage;
