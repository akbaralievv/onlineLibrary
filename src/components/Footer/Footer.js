import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.parent_footer}>
        <div className="container">
          <div className={styles.child_footer}>
            <div>
              <a href="">О нас </a>
              <div className={styles.vertical_line}></div>
              <a href="/privacy">Политика конфиденциальности</a>
              <div className={styles.vertical_line}></div>
              <a className={styles.decktop} href="">
                Условия использования
              </a>
            </div>
            <a className={styles.mobile} href="">
              Условия использования
            </a>

            <div>
              <span>© 2023 ООО "Электронные книги".</span>
              <span> Все права защищены.</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.privacyParent}>
        <div className={styles.privacyChlid}>
          <div>
            <button></button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
