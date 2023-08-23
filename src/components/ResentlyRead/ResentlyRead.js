import React from "react";
import styles from "./ResentlyRead.module.css";

const ResentlyRead = () => {
  const aitmatov =
    "https://biographe.ru/wp-content/uploads/2019/12/232323-11.jpg";
  const book =
    "https://img3.labirint.ru/rc/39f94de6245bb7548e51bc9bced869c5/363x561q80/books56/553589/cover.jpg?1563948590";

  return (
    <div className={styles.parent_resently}>
      <div className="standart_headers">
        <h4 className="standart_headers_h4">В</h4>
        <span className="standart_headers_span">ы недавно читали</span>
      </div>
      <div className={styles.child_resently}>
        <div className="container">
          <div className={styles.inner_resently}>
            <div className={styles.inner_resently_author}>
              <div>
                <img src={aitmatov} alt="" />
              </div>
              <section>
                <p>Ч. Айтматов</p>
                <span>Писатель, Художник</span>
              </section>
            </div>
            <div className={styles.inner_resently_infoBook}>
              <h5>Ч. Айтматов “Плаха”</h5>
              <div>
                <div>
                  <img src={book} alt="" />
                </div>
                <section>
                  <p>Вы остановились:</p>
                  <span>Глава 4, страница 389.</span>
                  <b>Вы читали эту книгу 4 дня назад</b>
                  <button>Продолжить читать</button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResentlyRead;
