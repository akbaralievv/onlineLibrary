import React, { useEffect, useState } from "react";
import styles from "./AddComments.module.css";
import { useDispatch } from "react-redux";
import { sendRequestAddCommetns } from "../../../store/reducers/sendRequestEveryBookSlice";
import {
  changePreloader,
  detailedData,
} from "../../../store/reducers/sendRequestMainPageSlice";

const AddComments = ({ dataDetailedPage, id }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("dataUser")));
  }, []);
  const [star, setStar] = useState(1);
  const starArr = [1, 2, 3, 4, 5];
  const [addComment, setAddComment] = useState(false);
  // console.log(data);
  // console.log(star);
  const [input, setInput] = useState("");
  const sendAddCommetns = (e) => {
    e.preventDefault();
    dispatch(
      sendRequestAddCommetns({
        input: input,
        star: star,
        id: dataDetailedPage.id,
      })
    );
    dispatch(detailedData(id));
    setAddComment(false);
  };
  return (
    <div className={styles.parent_addComments}>
      <div className="container">
        <div className={styles.child_addComments}>
          <div onClick={() => setAddComment(true)}>
            <div>
              <div>
                <img src={data?.user_photo} alt="user" />
              </div>
              <div>
                <p>{data?.username}</p>
                <span>{data?.email}</span>
              </div>
            </div>
            <div>
              <p>Оцените книгу</p>
              <div>
                {starArr.map((btnStar, index) => {
                  return (
                    <button key={index} onClick={() => setStar(btnStar)}>
                      {btnStar <= star ? (
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z"
                            fill="#FFC700"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z"
                            fill="#FFf"
                            stroke="#FFC700"
                            strokeWidth="1"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {addComment && (
            <form onSubmit={sendAddCommetns}>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                placeholder="Поделитесь впечатлениями о книге"
              ></textarea>
              <button type="submit">Добавить</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddComments;
