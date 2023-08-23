import React, { useState, useEffect } from "react";
import styles from "./Reader.module.css";
import ReactPaginate from "react-paginate";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import {
  changeReaderCurrentPage,
  sendRequestGetBookLastPage,
  sendRequestGetBookText,
} from "../../store/reducers/sendRequestEveryBookSlice";
import settingImg from "../../assests/images/readingNow/mdi_share.svg";

const Reader = ({ id }) => {
  const dispatch = useDispatch();
  const { bookTextInfo, preloader, readerCurrentPage, bookRequestError } =
    useSelector((state) => state.sendRequestEveryBookSlice);
  // useEffect(() => {
  //   dispatch(getBookTextInfo(id))
  // }, [ ])
  // dispatch(getBookTextInfo(id, currentReaderPage))
  const [fontFamaly, setFontFamaly] = useState("");
  const [lineHeight, setLineHeight] = useState(48);
  const [optionsOpened, setOptionsOpened] = useState(false);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(3);
  const [nextLabel, setNextLabel] = useState("Вперед");
  const [prevLabel, setPrevLabel] = useState("Назад");
  const [currentOptionMargin, setCurrentOptionMargin] = useState(-550);
  // const [inputValue, setInputValue] = useState(48)
  // const [a, setA] = useState(window.screen.width)
  // useEffect(() => {
  //   console.log(window.screen.width);
  // }, [a])
  const checkWindowSize = () => {
    if (window.screen.width > 1100) {
      setPageRangeDisplayed(5);
      setMarginPagesDisplayed(3);
      setNextLabel("Вперед");
      setPrevLabel("Назад");
    } else if (window.screen.width <= 1100 && window.screen.width >= 970) {
      setPageRangeDisplayed(3);
      setMarginPagesDisplayed(3);
      setNextLabel("Вперед");
      setPrevLabel("Назад");
    } else if (window.screen.width < 970 && window.screen.width > 910) {
      setPageRangeDisplayed(3);
      setMarginPagesDisplayed(3);
      setNextLabel("Вперед");
      setPrevLabel("Назад");
      // setMarginPagesDisplayed(1)
    } else if(window.screen.width <= 910 && window.screen.width > 760) {
      setNextLabel(">")
      setPrevLabel("<")
      setMarginPagesDisplayed(3)
      setPageRangeDisplayed(3)
    } else if(window.screen.width <= 760 && window.screen.width > 630) {
      setNextLabel(">")
      setPrevLabel("<")
      setMarginPagesDisplayed(2)
      setPageRangeDisplayed(2)
    } else if(window.screen.width <= 630 && window.screen.width > 560){
      setMarginPagesDisplayed(2)
      setPageRangeDisplayed(2)
      setNextLabel(">")
      setPrevLabel("<")
    } else {
      setMarginPagesDisplayed(2)
      setPageRangeDisplayed(1)
      setNextLabel(">")
      setPrevLabel("<")
    }

    if (window.screen.width <= 660 && window.screen.width > 570) {
      setCurrentOptionMargin(-490);
    } else if (window.screen.width <= 570 && window.screen.width > 380) {
      setCurrentOptionMargin(-322);
    } else if (window.screen.width <= 380) {
      setCurrentOptionMargin(-281);
    } else {
      setCurrentOptionMargin(-550);
    }
  };
  window.onresize = () => {
    // console.log(window.screen.width);
    // console.log(window.screen.height);
    checkWindowSize();
  };
  useEffect(() => {
    if (localStorage.getItem("fontFamaly") !== null) {
      setFontFamaly(localStorage.getItem("fontFamaly"));
    } else {
      setFontFamaly("Roboto");
      localStorage.setItem("fontFamaly", "Roboto");
    }

    if (localStorage.getItem("lineHeight") !== null) {
      setLineHeight(localStorage.getItem("lineHeight"));
    } else {
      setLineHeight(48);
      localStorage.setItem("lineHeight", 48);
    }

    checkWindowSize();
  }, []);

  useEffect(() => {
    localStorage.setItem("lastBook", id);
  }, [readerCurrentPage]);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.readerParent}>
          <div
            className={styles.bookText}
            style={{ fontFamily: fontFamaly, lineHeight: lineHeight + "px" }}
          >
            {/* {bookTextInfo.results.length <= 0 ? "Ошибка при получении текста." : bookTextInfo.results[0].text} */}
            {!bookRequestError
              ? (bookTextInfo?.results.length <= 0
                ? "Отсутствует текст."
                : bookTextInfo?.results[0].text)
              : "Ошибка при выполнении запроса!"}
          </div>
          <div
            className={styles.textOptionsParent}
            style={{ right: optionsOpened ? "0" : currentOptionMargin + "px" }}
          >
            <div
              className={styles.settingImg}
              onClick={() => {
                setOptionsOpened(!optionsOpened);
              }}
            >
              <img src={settingImg} alt="404" />
            </div>
            <div
              className={styles.textOptions}
              style={{
                boxShadow: optionsOpened ? "0 0 50px #7777778a" : "none",
              }}
            >
              <label htmlFor="selectFont">Настройка шрифта</label>
              <select
                name="font"
                id="selectFont"
                value={fontFamaly}
                style={{ fontFamaly: fontFamaly }}
                onChange={(e) => {
                  setFontFamaly(e.target.value);
                  localStorage.setItem("fontFamaly", e.target.value);
                }}
              >
                <option
                  value="'Roboto'"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Roboto
                </option>
                <option
                  value="'Open Sans'"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Open Sans
                </option>
                <option
                  value="'Raleway'"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Raleway
                </option>
              </select>
              <span>Межстрочный отступ</span>
              <input
                type="range"
                min={40}
                max={90}
                value={lineHeight}
                style={{
                  backgroundSize:
                    ((lineHeight - 40) * 100) / (90 - 40) + "% 100%",
                }}
                onChange={(e) => {
                  setLineHeight(e.target.value);
                  localStorage.setItem("lineHeight", e.target.value);
                  // e.target.style.backgroundSize = (lineHeight - e.target.min) * 100 / (e.target.max - e.target.min) + '% 100%'
                }}
              />
              <button
                onClick={() => {
                  setFontFamaly("Roboto");
                  setLineHeight(48);
                  localStorage.setItem("lineHeight", 48);
                  localStorage.setItem("fontFamaly", "Roboto");
                }}
              >
                Сбросить настройки
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <Pagination
          styles={styles}
          nextLabel={nextLabel}
          previousLabel={prevLabel}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={marginPagesDisplayed}
          needScroll={true}
          pageCount={bookTextInfo.count}
          id={id}
        />
      </div>
    </>
  );
};

export default Reader;
