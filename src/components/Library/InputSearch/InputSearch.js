import React, { useEffect, useState } from "react";
import styles from "./InputSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilterBookState,
  changeFilteredBtn,
  changeSearch,
  changeSearchState,
  changeSortBtn,
  changeSortState,
} from "../../../store/reducers/sendRequestLibraryPageSlice";

const InputSearch = ({ setStateInput }) => {
  const { searchState } = useSelector(
    (state) => state.sendRequestLibraryPageSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchState === "") {
      setStateInput(false);
    }
  }, [searchState, setStateInput]);
  const searchBook = (e) => {
    e.preventDefault();
    dispatch(changeSearch(searchState));
    setStateInput(true);
    ///////////сброс состояний///////////
    dispatch(changeFilterBookState(1));
    dispatch(changeSortState(-1));
    dispatch(changeSortBtn(""));
    dispatch(changeFilteredBtn(""));
    ///////////сброс состояний///////////
  };
  return (
    <div className={styles.parentBlock_search}>
      <form action="" onSubmit={(e) => searchBook(e)}>
        <input
          placeholder="Книга, жанры, автор"
          onChange={(e) => dispatch(changeSearchState(e.target.value))}
          className={styles.inputSearch}
          name="input"
          value={searchState}
        />
        <button type="submit">Поиск</button>
        <button type="submit">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C11.125 18 13.078 17.2635 14.6177 16.0319L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L16.0319 14.6177C17.2635 13.078 18 11.125 18 9C18 4.02944 13.9706 0 9 0ZM2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9Z"
              fill="#2A2A2A"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputSearch;
