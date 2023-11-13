import logo from "../images/header__logo.svg";
import { Route, Routes, Link } from "react-router-dom";
import React from "react";
export default function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="место" className="header__logo" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__info">
              <p className="header__email">{props.currentUserEmail}</p>
              <Link className="header__exit" onClick={props.onLogout}>
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__enter" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__enter" to="/sign-in">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}
