import React, { useEffect } from 'react'
import Reader from '../../components/Reader/Reader'
import styles from "./ReaderPage.module.css"
import { useState } from 'react'
import axios from 'axios'
import HeaderDetailed from '../../components/Detailed/HeaderDetailed/HeaderDetailed'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailedData } from "../../store/reducers/sendRequestMainPageSlice";
import Preloader from '../../components/Preloader/Preloader'
import NoAuth from '../../components/NoAuth/NoAuth'


const ReaderPage = () => {
  const dispatch = useDispatch();
  const { dataDetailedPage, ifSendRequestError, preloader } = useSelector(
    (state) => state.sendRequestMainPageSlice
  );

  const { id } = useParams();
  useEffect(() => {
    dispatch(detailedData(id));
  }, [ id ]);


    //   useEffect(() => {
    //     axios.get("").then(data => setBookText(data.data))
    //   }, [])
  return (
    <>
      {preloader ? (
        <Preloader/>
      ) : (
        <>
        {ifSendRequestError ? (
          <div className={styles.parentReader}>
            <HeaderDetailed dataDetailedPage={dataDetailedPage} dontShowBtn={true}/>
            <Reader id={id}/>
          </div>
        ) : (
          <NoAuth/>
          )}
        </>
        
      )}
   </> 
  )
}

export default ReaderPage