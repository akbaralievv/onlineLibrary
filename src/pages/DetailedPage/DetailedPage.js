import React, { useEffect, useState } from "react";
import styles from "./DetailedPage.module.css";
import HeaderDetailed from "../../components/Detailed/HeaderDetailed/HeaderDetailed";
import Comments from "../../components/Detailed/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailedData } from "../../store/reducers/sendRequestMainPageSlice";
import Preloader from "../../components/Preloader/Preloader";
import NoAuth from "../../components/NoAuth/NoAuth";
import AddComments from "../../components/Detailed/AddComments/AddComments";

const DetailedPage = () => {
  const dispatch = useDispatch();
  const { dataDetailedPage, ifSendRequestError, preloader } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(detailedData(id));
  }, []);

  // console.log(dataDetailedPage, "dataDetailedPage");
  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <>
            {ifSendRequestError ? (
              <div className={styles.parent_detailed}>
                <HeaderDetailed dataDetailedPage={dataDetailedPage} />
                <div className="container">
                  <div className={styles.short_description}>
                    <h2>Краткое содержание </h2>
                    <p>{dataDetailedPage?.summary}</p>
                  </div>
                  <div className={styles.comments_parent}>
                    <h5>Отзывы</h5>
                    <AddComments id={id} dataDetailedPage={dataDetailedPage} />
                    <Comments dataDetailedPage={dataDetailedPage} />
                  </div>
                </div>
              </div>
            ) : (
              <NoAuth />
            )}
          </>
        </>
      )}
    </>
  );
};

export default DetailedPage;
