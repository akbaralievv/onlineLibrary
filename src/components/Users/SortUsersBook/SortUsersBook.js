import React, { useState } from "react";
import styles from "./SortUsersBook.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeChoiceUserBook, changeActiveSortBtn } from "../../../store/reducers/usersStateSlice";

const SortUsersBook = () => {
  const dispatch = useDispatch();
  // const [favorites, setFavorites] = useState(
  //     JSON.parse(localStorage.getItem("activeBtnSort"))
  //       ? JSON.parse(localStorage.getItem("activeBtnSort"))
  //       : 1
  //   );
    const {activeSortBtn} = useSelector(
      (state) => state.usersStateSlice
    )

  const favoriteBook = [
    { id: 1, text: "Избранное", dataApi: "favorite" },
    { id: 2, text: "Читаю сейчас", dataApi: "read_bookmark" },
    { id: 3, text: "Прочитано", dataApi: "finish_bookmark" },
  ];

  const sortFavoriteBook = (id, dataApi) => {
    // localStorage.setItem("activeBtnSort", id);
    dispatch(changeActiveSortBtn(id))
    dispatch(changeChoiceUserBook(dataApi));
    // setFavorites(id);
  };

  return (
    <div className={styles.parent_sortBook}>
      {favoriteBook.map((item) => (
        <button
          key={item.id}
          onClick={() => sortFavoriteBook(item.id, item.dataApi)}
          className={item.id === activeSortBtn ? styles.active_usersBook : ""}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default SortUsersBook;
