import React from "react";
import styles from "./HeaderDetailed.module.css";
import book from "../../../assests/images/Detailed/info_book.png";
import Rating_Star from "../../Sliders/SlidersMainPage/Rating_Star/Rating_Star";
import { Link } from "react-router-dom";
import DetailedPage from "../../../pages/DetailedPage/DetailedPage";

const HeaderDetailed = ({ dataDetailedPage, dontShowBtn }) => {
  // console.log(dataDetailedPage);
  return (
    <div className={styles.parent_deaderDetailed}>
      <div className="container">
        <div className={styles.child_detailed}>
          <div className={styles.child_img_detailed}>
            <img src={dataDetailedPage.cover} alt="book" />
            <div className={styles.child_img_detailed_mini}>
              <img src={dataDetailedPage.cover} alt="book" />
            </div>
          </div>
          <ul className={styles.child_info_detailed}>
            <li>
              <h4>Название книги</h4>
              <span>{dataDetailedPage.title}</span>
            </li>
            <li>
              <h4>Автор</h4>
              <span>{dataDetailedPage.author_name}</span>
            </li>
            <li>
              <h4>Год публикации</h4>
              <span>{dataDetailedPage?.publication_year}</span>
            </li>
            <li>
              <h4>Жанр</h4>
              <>
                {dataDetailedPage.genre?.map((i, index) => (
                  <span key={index}>{i.genre_name}</span>
                ))}
              </>
            </li>
            <li>
              <h4>Рейтинг</h4>
              <div className={styles.star_reting}>
                <Rating_Star
                  grade_star={dataDetailedPage?.middle_star}
                  grade={dataDetailedPage?.middle_star}
                />
              </div>
            </li>
            <li>
              {dontShowBtn ? null : (
                <Link to={`/read/${dataDetailedPage.id}`}>
                  <button>Читать</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        {/* ///adaptation/////// */}
        <ul className={styles.child_info_detailed_mini}>
          <li>
            {dontShowBtn ? null : (
              <Link to={`/read/${dataDetailedPage.id}`}>
                <button>Читать</button>
              </Link>
            )}
          </li>
          <li>
            <span>{dataDetailedPage.title}</span>
          </li>
          <li>
            <h4>Автор: </h4>
            <span>{dataDetailedPage.author_name}</span>
          </li>
          <li>
            <h4>Год публикации: </h4>
            <span>1962</span>
          </li>
          <li>
            <h4>Жанр: </h4>
            <>
              {dataDetailedPage.genre?.map((i, index) => (
                <span key={index}>{i.genre_name}</span>
              ))}
            </>
          </li>
          <li>
            <h4>Рейтинг</h4>
            <div className={styles.star_reting}>
              <Rating_Star grade_star={2} grade={2.6} />
            </div>
          </li>
        </ul>
        {/* ///adaptation/////// */}
      </div>
    </div>
  );
};

export default HeaderDetailed;
