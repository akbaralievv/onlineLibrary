import React, { useEffect, useState } from "react";
import styles from "./NavMenu.module.css";
import navLogo from "../../assests/images/navMenu/navLogo.svg";
import btn_nav from "../../assests/images/navMenu/nav_btn.svg";
import { NavLink, useLocation } from "react-router-dom";
import UserLogin from "../UserLogin/UserLogin";

const NavMenu = () => {
  const [active, setActive] = useState(
    localStorage.getItem("statePage_main")
      ? +localStorage.getItem("statePage_main")
      : 0
  );

  localStorage.setItem("statePage_main", active);

  const pagesArr = [
    {
      page: "Главная",
      to: "/",
    },
    {
      page: "Библиотека",
      to: "/library",
    },
    {
      page: "Читаю сейчас",
      to: "reading_now",
    },
    {
      page: "Профиль",
      to: "/profile",
    },
  ];
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActive(0);
    } else if (location.pathname === "/library") {
      setActive(1);
    } else if (location.pathname === "/reading_now") {
      setActive(2);
    } else if (location.pathname === "/profile") {
      setActive(3);
    }
  }, [location]);
  const [menu, setMenu] = useState(window.innerWidth >= 901);
  const clickMenu = (index) => {
    setActive(index);
    if (window.innerWidth <= 901) {
      setMenu(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 901) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menu]);

  return (
    <>
      {menu ? (
        <>
          <div
            className={styles.shadow_navMenu}
            onClick={() => clickMenu(11)}
          ></div>
          <div className={styles.parent_navMenu}>
            <div className="container">
              <div className={styles.child_navMenu}>
                <div className={styles.mainLogo}>
                  <NavLink to={"/"}>
                    <div>
                      <img src={navLogo} alt="navLogo" />
                    </div>
                    <h1>Muras</h1>
                  </NavLink>
                </div>
                <div className={styles.mainMenu_desktop}>
                  <ul>
                    {pagesArr.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          to={item.to}
                          onClick={() => clickMenu(index)}
                          className={active === index && styles.activeNavMenu}
                        >
                          {item.page}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={styles.otherMenu_btn}
                  onClick={() => clickMenu(10)}
                >
                  <UserLogin />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.menuNav_mobile}>
          <div className={styles.mainLogo}>
            <NavLink to={"/"}>
              <div>
                <img src={navLogo} alt="navLogo" />
              </div>
              <h1>Muras</h1>
            </NavLink>
          </div>
          <button onClick={() => setMenu(true)}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66602 8.0013C2.66602 7.26492 3.26297 6.66797 3.99935 6.66797H27.9993C28.7357 6.66797 29.3327 7.26492 29.3327 8.0013C29.3327 8.73768 28.7357 9.33464 27.9993 9.33464H3.99935C3.26297 9.33464 2.66602 8.73768 2.66602 8.0013Z"
                fill="black"
              />
              <path
                d="M2.66602 16.0013C2.66602 15.2649 3.26297 14.668 3.99935 14.668H27.9993C28.7357 14.668 29.3327 15.2649 29.3327 16.0013C29.3327 16.7377 28.7357 17.3346 27.9993 17.3346H3.99935C3.26297 17.3346 2.66602 16.7377 2.66602 16.0013Z"
                fill="black"
              />
              <path
                d="M3.99935 22.668C3.26297 22.668 2.66602 23.2649 2.66602 24.0013C2.66602 24.7377 3.26297 25.3346 3.99935 25.3346H27.9993C28.7357 25.3346 29.3327 24.7377 29.3327 24.0013C29.3327 23.2649 28.7357 22.668 27.9993 22.668H3.99935Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default NavMenu;
