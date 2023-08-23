import React, { useEffect, useState } from "react";
import styles from "./UsersPage.module.css";
import SortUsersBook from "../../components/Users/SortUsersBook/SortUsersBook";
import FavoritesBookUsers from "../../components/Users/FavoritesBookUsers/FavoritesBookUsers";
import DataEveryUser from "../../components/Users/DataEveryUser/DataEveryUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReadingNow,
  sendRequestAllDataUser,
  sendRequestDataEveryUser,
} from "../../store/reducers/usersStateSlice";
import Preloader from "../../components/Preloader/Preloader";
import NoAuth from "../../components/NoAuth/NoAuth";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    preloader,
    dataFavotitesBook,
    finishedBookUser,
    readingNowBookUser,
    checkedUser,
    choiceUserBook,
  } = useSelector((state) => state.usersStateSlice);
  //   console.log(dataFavotitesBook, "dataFavotitesBook");
  // console.log(choiceUserBook);
  useEffect(() => {
    if (choiceUserBook === "favorite") {
      dispatch(sendRequestAllDataUser(choiceUserBook));
    }
  }, [choiceUserBook]);

  useEffect(() => {
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")));
  }, []);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          {checkedUser ? (
            <div className="container">
              <div className={styles.mobile_adaptaionBlock}>
                <div className={styles.child_user_userBlock}>
                  <div className={styles.parent_settingBlock}>
                    <button onClick={() => navigate("/setting_users")}>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.7248 2.92009e-06C18.1952 2.92009e-06 18.6159 0.292789 18.7743 0.731169L19.9039 3.86222C20.3087 3.96302 20.6559 4.06381 20.9503 4.16941C21.2719 4.2846 21.6862 4.459 22.1982 4.69738L24.8285 3.30545C25.0432 3.1917 25.289 3.15065 25.529 3.18844C25.769 3.22623 25.9903 3.34083 26.1597 3.51504L28.4732 5.90693C28.7804 6.22531 28.8668 6.69089 28.694 7.09727L27.4604 9.98834C27.6652 10.3643 27.8284 10.6859 27.9532 10.9547C28.0876 11.2475 28.254 11.6507 28.4524 12.1706L31.3275 13.4026C31.7595 13.5866 32.0267 14.0185 31.9979 14.4809L31.7867 17.8008C31.7723 18.0164 31.6948 18.2231 31.564 18.3952C31.4332 18.5673 31.2547 18.6972 31.0507 18.7687L28.3276 19.7367C28.2492 20.1127 28.1676 20.4343 28.0812 20.7062C27.9419 21.1263 27.7828 21.5395 27.6044 21.9446L28.9724 24.9684C29.0689 25.1809 29.0949 25.4187 29.0466 25.647C28.9982 25.8753 28.878 26.0821 28.7036 26.2372L26.1021 28.5603C25.9308 28.7126 25.717 28.809 25.4894 28.8364C25.2617 28.8639 25.0312 28.8211 24.8285 28.7139L22.147 27.2931C21.7275 27.5153 21.2947 27.7114 20.8511 27.8803L19.6799 28.3187L18.6399 31.1985C18.5629 31.4094 18.4239 31.5921 18.2411 31.7226C18.0584 31.8531 17.8405 31.9253 17.616 31.9297L14.5761 31.9985C14.3456 32.0046 14.119 31.939 13.9273 31.811C13.7356 31.6829 13.5883 31.4986 13.5057 31.2833L12.2802 28.0403C11.862 27.8974 11.448 27.7427 11.0386 27.5763C10.7038 27.4314 10.374 27.275 10.0498 27.1075L7.00995 28.4067C6.80964 28.4921 6.58882 28.5175 6.37435 28.4797C6.15989 28.442 5.96103 28.3426 5.80199 28.1939L3.55247 26.0836C3.38498 25.9272 3.27093 25.722 3.22642 25.4972C3.18192 25.2724 3.20922 25.0393 3.30447 24.8308L4.61163 21.983C4.43778 21.6457 4.27661 21.302 4.12845 20.9526C3.95549 20.525 3.79543 20.0923 3.64846 19.6551L0.784561 18.7831C0.55177 18.7128 0.348727 18.5675 0.206964 18.3699C0.0652019 18.1723 -0.00734583 17.9334 0.00058793 17.6904L0.112584 14.6169C0.120556 14.4164 0.1832 14.2219 0.293743 14.0543C0.404285 13.8868 0.558518 13.7528 0.739762 13.6666L3.74446 12.2234C3.88365 11.7131 4.00525 11.3163 4.11245 11.0267C4.26339 10.6399 4.431 10.2598 4.61483 9.88754L3.31247 7.13567C3.21364 6.92669 3.18362 6.69175 3.22675 6.46464C3.26987 6.23753 3.38391 6.02994 3.55247 5.87173L5.79879 3.75023C5.95626 3.60171 6.15329 3.50186 6.36617 3.46269C6.57906 3.42352 6.79873 3.4467 6.99875 3.52944L10.0354 4.78378C10.3714 4.55979 10.6754 4.379 10.9506 4.23341C11.2786 4.05901 11.717 3.87662 12.269 3.67983L13.3249 0.734369C13.403 0.518808 13.5457 0.332598 13.7335 0.201163C13.9214 0.069729 14.1452 -0.000521977 14.3745 2.92009e-06H17.7248ZM16.0384 11.2299C13.3713 11.2299 11.2098 13.3658 11.2098 16.0025C11.2098 18.6391 13.3713 20.7766 16.0384 20.7766C18.7039 20.7766 20.8655 18.6391 20.8655 16.0025C20.8655 13.3658 18.7055 11.2299 16.0384 11.2299Z"
                          fill="#2A2A2A"
                        />
                      </svg>
                    </button>
                  </div>
                  <DataEveryUser />
                </div>
              </div>
              <div className={styles.parent_userBlock}>
                <div className={styles.child_books_userBlock}>
                  <SortUsersBook />
                  {choiceUserBook === "read_bookmark" ? (
                    <FavoritesBookUsers
                      dataFavotitesBook={readingNowBookUser}
                    />
                  ) : null}
                  {choiceUserBook === "finish_bookmark" ? (
                    <FavoritesBookUsers dataFavotitesBook={finishedBookUser} />
                  ) : null}
                  {choiceUserBook === "favorite" ? (
                    <FavoritesBookUsers dataFavotitesBook={dataFavotitesBook} />
                  ) : null}
                  {/* <FavoritesBookUsers dataFavotitesBook={dataFavotitesBook} /> */}
                </div>
                <div className={styles.child_user_userBlock}>
                  <div className={styles.parent_settingBlock}>
                    <button onClick={() => navigate("/setting_users")}>
                      Настройки
                    </button>
                  </div>
                  <DataEveryUser />
                </div>
              </div>
            </div>
          ) : (
            <NoAuth />
          )}
        </>
      )}
    </>
  );
};

export default UsersPage;
