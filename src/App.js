import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import Layout from "./components/HOC/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ReadingNow from "./pages/ReadingNow/ReadingNow";
import UsersPage from "./pages/UsersPage/UsersPage";
import DetailedPage from "./pages/DetailedPage/DetailedPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTokens } from "./store/reducers/usersStateSlice";
import SettingUserPage from "./pages/SettingUserPage/SettingUserPage";
import ActiveUserPage from "./pages/ActiveUserPage/ActiveUserPage";
import DetailedWritersPage from "./pages/DetailedWritersPage/DetailedWritersPage";
import ReaderPage from "./pages/ReaderPage/ReaderPage";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const startTimestamp = localStorage.getItem("timerStartTimestamp");
  //   const currentTime = Date.now();
  //   const intervalTime = 9 * 60 * 1000; // 9 минут в миллисекундах
  //   // Если есть сохраненное время начала таймера и время не истекло
  //   if (startTimestamp && currentTime - startTimestamp < intervalTime) {
  //     const remainingTime = intervalTime - (currentTime - startTimestamp);
  //     const interval = setInterval(() => {
  //       dispatch(updateTokens());
  //       console.log("Функция срабатывает каждые 9 минут");
  //     }, remainingTime);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   } else {
  //     // Если время истекло или таймер не был ранее запущен, запускаем новый таймер
  //     localStorage.setItem("timerStartTimestamp", currentTime.toString());

  //     const interval = setInterval(() => {
  //       dispatch(updateTokens());
  //       console.log("Функция срабатывает каждые 9 минут");
  //     }, intervalTime);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading_now" element={<ReadingNow />} />
        {/* <Route path="/reading_now/:id" element={<ReadingNow />} /> */}
        <Route path="/profile" element={<UsersPage />} />
        <Route path="/detailed/:id" element={<DetailedPage />} />
        <Route path="/detailedwriter/:id" element={<DetailedWritersPage />} />
        <Route path="/read/:id" element={<ReaderPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/setting_users" element={<SettingUserPage />} />
      <Route path="/registration_active" element={<ActiveUserPage />} />
      <Route path="/about" element={<ActiveUserPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
