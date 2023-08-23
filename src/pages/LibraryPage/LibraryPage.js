import React, { useEffect, useState } from "react";
import styles from "./LibraryPage.module.css";
import InputSearch from "../../components/Library/InputSearch/InputSearch";
import Filtration from "../../components/Library/Filtration/Filtration";
import { requestAllData } from "../../store/reducers/sendRequestLibraryPageSlice";
import { useDispatch, useSelector } from "react-redux";
import InfoEveryBook from "../../components/Library/InfoEveryBook/InfoEveryBook";
import SortBtns from "../../components/Library/SortBtns/SortBtns";
import Preloader from "../../components/Preloader/Preloader";
import NoData from "../../components/Library/NoData/NoData";
import { sendRequestAllDataUser } from "../../store/reducers/usersStateSlice";

const LibraryPage = () => {
  const dispatch = useDispatch();
  const { preloader, allData, search, sortBtn, filteredBtn, stateBtn } =
    useSelector((state) => state.sendRequestLibraryPageSlice);

  const { dataFavotitesBook, choiceUserBook } = useSelector(
    (state) => state.usersStateSlice
  );
  // console.log(allData, "allData");
  // console.log(dataFavotitesBook, "dataFavotitesBook");
  // console.log(data, "dataUSER");
  // console.log(filteredBtn, "filteredBtn");
  // console.log(stateInput);
  // console.log(sortBtn);
  const [stateInput, setStateInput] = useState(false);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    dispatch(sendRequestAllDataUser("favorite"));
    dispatch(
      requestAllData({
        search: search,
        sortBtn: sortBtn,
        filteredBtn: filteredBtn,
        stateInput: stateInput,
      })
    );
  }, [search, sortBtn, choiceUserBook, filteredBtn, stateBtn, stateInput, arr]);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className={styles.library_parentBlock}>
          <div className="container">
            <InputSearch setStateInput={setStateInput} />
            <div className={styles.library_childBlock}>
              <div className={styles.library_info}>
                <Filtration />
                <div className={styles.library_mainContent}>
                  {allData.length === 0 ? (
                    <NoData />
                  ) : (
                    <>
                      {allData.map((book) => {
                        if (
                          dataFavotitesBook?.some(
                            (item) => item?.id === book?.id
                          )
                        ) {
                          arr.push(book.id);
                        }
                        return (
                          <InfoEveryBook
                            book={book}
                            key={book.id}
                            arr={arr}
                            setArr={setArr}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className={styles.library_sortBlock}>
                <h5>По жанрам</h5>
                <SortBtns />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LibraryPage;
