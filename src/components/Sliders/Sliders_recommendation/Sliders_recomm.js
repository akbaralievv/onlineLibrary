// import React from "react";
// import SliderRecommBlock from "./SliderRecommBlock/SliderRecommBlock";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styles from "./Sliders_recomm.module.css";

// const Sliders_recomm = () => {
//   const recommendPosts = [
//     {
//       id: 1,
//       title: "Плаха",
//       writer: "Чынгыз Айматов",
//       rating_star: 2,
//       rating: 4.5,
//     },
//     {
//       id: 2,
//       title: "Первый учитель",
//       writer: "Чынгыз Айматов",
//       rating_star: 5,
//       rating: 9.5,
//     },
//     {
//       id: 3,
//       title: "Материнское поле",
//       writer: "Чынгыз Айматов",
//       rating_star: 3,
//       rating: 6,
//     },
//     {
//       id: 4,
//       title: "Ак кеме",
//       writer: "Чынгыз Айматов",
//       rating_star: 1,
//       rating: 8,
//     },
//   ];
//   const settings = {
//     dots: false,
//     buttuns: true,
//     infinite: true,
//     slidesToShow: 2,
//     slidesToScroll: 2,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   return (
//     <div className={styles.slider}>
//       <Slider {...settings}>
//         {recommendPosts.map((slide) => (
//           <SliderRecommBlock slide={slide} key={slide.id} />
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Sliders_recomm;
