import React, { useEffect } from 'react'
import Reader from '../../components/Reader/Reader'
import styles from "./ReadingNow.module.css"
import { useState } from 'react'
import axios from 'axios'
import HeaderDetailed from '../../components/Detailed/HeaderDetailed/HeaderDetailed'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePreloader, detailedData } from "../../store/reducers/sendRequestMainPageSlice";
import Preloader from '../../components/Preloader/Preloader'
import NoAuth from '../../components/NoAuth/NoAuth'
import { sendRequestDataEveryUser } from '../../store/reducers/usersStateSlice'


const ReadingNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { dataDetailedPage, ifSendRequestError, preloader } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );
  const { readingNowBookUser } = useSelector(
    (state) => state.usersStateSlice
  )
  const userName = JSON.parse(localStorage.getItem("dataUser"))

  // const { id } = useParams();
  useEffect(() => {
    dispatch(sendRequestDataEveryUser(localStorage.getItem("access")))
  }, [ ])
  useEffect(() => {
    try {
      if(localStorage.getItem("lastBook") !== null) {
        dispatch(detailedData(localStorage.getItem("lastBook")));
      } else {
        dispatch(changePreloader(false))
      }
    } catch (error) {
      console.log(error);
    }
  }, [  ]);
  return (
  <>
    {localStorage.getItem("access") !== null ? (
      <>
      {preloader ? (
        <Preloader/>
      ) : (
        <>
        {localStorage.getItem("lastBook") !== null ? (
          <div className={styles.parentReader}>
            <HeaderDetailed dataDetailedPage={dataDetailedPage} dontShowBtn={true}/>
            <Reader id={localStorage.getItem("lastBook")}/>
          </div>
        ) : (
          <div className={styles.parent_reading}>
            <div className="container">
              <div className={styles.child_reading}>
                <div>
                  <h1>
                    Добро пожаловать,
                    <span>{userName?.username}</span>
                  </h1>
                  <div></div>
                  <p>
                    <button onClick={() => navigate("/library")}>
                      Нажмите сюда,
                    </button>
                    чтобы перейти в раздел библиотеки
                  </p>
                </div>
              </div>
            </div>
          </div> 
        )}
        </>
        )}
      </>
    ) : (
      <NoAuth/>
    )}
  </> 

  );
};

export default ReadingNow;
