import React from "react";
import styles from "./Rating_Star.module.css";

const Rating_Star = ({ grade_star, grade }) => {
  const arrGrade = [];
  let numGradeNone = 0;
  for (let i = 1; i <= grade_star; i++) arrGrade.push(i);
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
            width="32"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0.5L19.5922 11.5557H31.2169L21.8123 18.3885L25.4046 29.4443L16 22.6115L6.59544 29.4443L10.1877 18.3885L0.783095 11.5557H12.4078L16 0.5Z"
              fill="#FFC700"
            />
          </svg>
        ) : (
          <svg
            key={index}
            width="28"
            height="26"
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0.5L19.5922 11.5557H31.2169L21.8123 18.3885L25.4046 29.4443L16 22.6115L6.59544 29.4443L10.1877 18.3885L0.783095 11.5557H12.4078L16 0.5Z"
              fill="#fff"
              stroke="#FFC700"
              strokeWidth="1.5"
            />
          </svg>
        );
      })}
      <p>{grade}</p>
    </div>
  );
};

export default Rating_Star;
