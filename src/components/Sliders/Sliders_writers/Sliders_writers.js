import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./Sliders_writers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestKyrgyzWriters } from "../../../store/reducers/sendRequestMainPageSlice";
import { NavLink } from "react-router-dom";

const Sliders_writers = () => {
  const dispatch = useDispatch();
  const { kyrgyzWriters } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  // console.log(kyrgyzWriters, "kyrgyzWriters");

  useEffect(() => {
    dispatch(requestKyrgyzWriters());
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
  };

  return (
    <div>
      <h3>Наши писатели</h3>
      <div className={styles.parent_writers}>
        <div className="container">
          <div className={styles.child_writers}>
            <div className={styles.parent_sliderWriters}>
              <Slider className={styles.slider} {...settings}>
                {kyrgyzWriters?.map((slide) => (
                  <div key={slide.id}>
                    <div className={styles.child_sliderWriters}>
                      <div className={styles.img_writers}>
                        <img src={slide.image} alt="slide" />
                      </div>
                      <div>
                        <h2>{slide?.fullname}</h2>
                        <section className={styles.moreText_Slider}>
                          <div>
                            <h4>Краткая история: </h4>
                            <p>{slide.short_story}</p>
                          </div>
                          <div>
                            <h4>Награды: </h4>
                            <p>{slide.awards}</p>
                          </div>
                          <div>
                            <h4>Произведения: </h4>
                            {/* <p>{slide.works[0].title}</p> */}
                            {slide?.works?.map((item, index) => (
                              <span key={index}>{item.title}, </span>
                            ))}
                          </div>
                          <NavLink to={`/detailedwriter/${slide.id}`}>
                            <button>Подробнее</button>
                          </NavLink>
                        </section>
                      </div>
                    </div>
                    <div className={styles.block_for_btnSlider}>
                      {/* <NavLink to={`/detailedwriter/${slide.id}`}>
                      <button>Подробнее</button>
                    </NavLink> */}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliders_writers;
