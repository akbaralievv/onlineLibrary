import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailedWritersPage.module.css";
import { sendRequestDetailedWriters } from "../../store/reducers/sendRequestEveryBookSlice";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import NoAuth from "../../components/NoAuth/NoAuth";
import Slider_book_author from "../../components/Sliders/Slider_book_author/Slider_book_author";

const DetailedWritersPage = () => {
  const { infoEveryWriters, ifSendRequestError, preloader } = useSelector(
    (state) => state.sendRequestEveryBookSlice
  );
  const { checkedUser } = useSelector((state) => state.usersStateSlice);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(sendRequestDetailedWriters(id));
  }, []);
  console.log(infoEveryWriters);
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          {ifSendRequestError || checkedUser ? (
            <div className={styles.parent_detailedWriters}>
              <div className={styles.header_detailedWriters}>
                <h1>{infoEveryWriters?.fullname}</h1>
                <div className={styles.headerText_detailedWriters}>
                  <div>
                    <img src={infoEveryWriters?.image} alt="" />
                  </div>
                  <div>
                    <div>
                      <h2>Имя при рождении: </h2>
                      <p>{infoEveryWriters?.fullname}</p>
                    </div>
                    <div>
                      <h2>Дата рождения:</h2>
                      <p>{infoEveryWriters?.date_of_birth}</p>
                    </div>
                    <div>
                      <h2>Место рождения:</h2>
                      <p>{infoEveryWriters?.place_of_birth}</p>
                    </div>
                    <div>
                      <h2>Гражданство:</h2>
                      <p>{infoEveryWriters?.citizenship}</p>
                    </div>
                    <div>
                      <h2>Жанр:</h2>
                      <p>{infoEveryWriters.genre}</p>
                    </div>
                    <div>
                      <h2>Язык:</h2>
                      <p>{infoEveryWriters.language}</p>
                    </div>
                  </div>
                </div>
                <Slider_book_author data={infoEveryWriters?.author_books} />
                <div className="container">
                  <div className={styles.biography_detailedWriters}>
                    <h5>Биография</h5>
                    <p>{infoEveryWriters?.bio}</p>
                    <h5>Литературная деятельность</h5>
                    <p>{infoEveryWriters?.literary_activity}</p>
                  </div>
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

export default DetailedWritersPage;
