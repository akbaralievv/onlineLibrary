import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { useDispatch } from "react-redux";
// import { sendRequestComments } from "../../../store/reducers/sendRequestEveryBookSlice";
import Rating_Star from "../../Sliders/SlidersMainPage/Rating_Star/Rating_Star";

const Comments = ({ dataDetailedPage }) => {
  return (
    <div className={styles.wrapper_comment}>
      <div className="container">
        <div className={styles.parent_comments}>
          {dataDetailedPage?.reviews?.length === 0 ? (
            <div className={styles.noComment}>
              <p>Комментарий пока что нет...</p>
            </div>
          ) : (
            <>
              {dataDetailedPage?.reviews?.map((comment) => (
                <div key={comment.id}>
                  <div>
                    <div>
                      <img src={comment?.user_photo} alt="img" />
                    </div>
                    <div>
                      <p>{comment.username}</p>
                      <span>{comment.created_date}</span>
                      {/* <button>{comment.user_stars.value}</button> */}
                      <div>
                        <Rating_Star
                          grade_star={
                            comment.user_stars ? comment.user_stars : 1
                          }
                          grade={comment.user_stars ? comment.user_stars : 1}
                        />
                      </div>
                    </div>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
