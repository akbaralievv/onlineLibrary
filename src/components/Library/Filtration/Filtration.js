import React, { useState } from "react";
import styles from "./Filtration.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilterBookState,
  changeFilteredBtn,
  changeSearchState,
  changeSortBtn,
  changeSortState,
} from "../../../store/reducers/sendRequestLibraryPageSlice";

const Filtration = () => {
  const { filterBookState } = useSelector(
    (state) => state.sendRequestLibraryPageSlice
  );
  const dispatch = useDispatch();

  const filteredArr = [
    { id: 1, text: "Все", filt: "" },
    {
      id: 2,
      text: "По новизне",
      filt: "https://kitepkana1.pythonanywhere.com/search_filter/?ordering=-created_date",
    },
    {
      id: 3,
      text: "По рейтингу",
      filt: "https://kitepkana1.pythonanywhere.com/search_filter/?ordering=-middle_star",
    },
  ];

  const changeStateFiltered = (id, filter) => {
    dispatch(changeFilterBookState(id));
    dispatch(changeFilteredBtn(filter));
    ///////////сброс состояний///////////
    dispatch(changeSortBtn(""));
    dispatch(changeSortState(-1));
    dispatch(changeSearchState(""));
    ///////////сброс состояний///////////
  };

  return (
    <div className={styles.parent_filtered}>
      <h4>Фильтр</h4>
      {filteredArr.map((filtered) => (
        <button
          key={filtered.id}
          onClick={() => changeStateFiltered(filtered.id, filtered.filt)}
          className={
            filtered.id === filterBookState ? styles.active_filtered : ""
          }
        >
          {filtered.text}
        </button>
      ))}
    </div>
  );
};

export default Filtration;
