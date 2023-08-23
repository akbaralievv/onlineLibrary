import React from "react";
import styles from "./GradeRetingHeart.module.css";

const GradeRetingHeart = ({ grade }) => {
  const arrGrade = [];
  let numGradeNone = 0;
  for (let i = 1; i <= grade; i++) arrGrade.push(i);
  if (arrGrade.length < 5) {
    numGradeNone = 5 - arrGrade.length;
    // console.log(numGradeNone, "numGradeNone");
    for (let i = 1; i <= numGradeNone; i++) {
      arrGrade.push("transparent");
    }
  }
  //   console.log(arrGrade, "arrGrade");
  return (
    <div className={styles.parent_grade}>
      {arrGrade.map((heard, index) => {
        return typeof heard === "number" ? (
          <svg
            key={index}
            width="22"
            height="20"
            viewBox="0 0 23 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 0C2.81333 0 0.5 3.21475 0.5 6.5C0.5 9.84116 2.17415 12.6994 4.27151 14.9297C6.3721 17.1634 8.97698 18.8565 11.0528 19.8944C11.3343 20.0352 11.6657 20.0352 11.9472 19.8944C14.023 18.8565 16.6279 17.1634 18.7285 14.9297C20.8259 12.6994 22.5 9.84116 22.5 6.5C22.5 3.22013 20.2289 0 16.5 0C14.775 0 13.5531 0.479792 12.6186 1.20977C12.1785 1.55357 11.811 1.95011 11.4974 2.33639C11.1802 1.94929 10.8091 1.55266 10.3649 1.2079C9.42877 0.481245 8.20883 0 6.5 0Z"
              fill="#FF4004"
            />
          </svg>
        ) : (
          <svg
            key={index}
            width="22"
            height="20"
            viewBox="0 0 23 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 0C2.81333 0 0.5 3.21475 0.5 6.5C0.5 9.84116 2.17415 12.6994 4.27151 14.9297C6.3721 17.1634 8.97698 18.8565 11.0528 19.8944C11.3343 20.0352 11.6657 20.0352 11.9472 19.8944C14.023 18.8565 16.6279 17.1634 18.7285 14.9297C20.8259 12.6994 22.5 9.84116 22.5 6.5C22.5 3.22013 20.2289 0 16.5 0C14.775 0 13.5531 0.479792 12.6186 1.20977C12.1785 1.55357 11.811 1.95011 11.4974 2.33639C11.1802 1.94929 10.8091 1.55266 10.3649 1.2079C9.42877 0.481245 8.20883 0 6.5 0Z"
              fill="#fff"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default GradeRetingHeart;
