import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const Header = () => {
  return <div>Шапка</div>;
};
const Footer = () => {
  return <div>Футер</div>;
};

export const App = () => {
  return (
    <>
      <Header />
      <div>
        <h2>Контент страницы</h2>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<div>Авторизация</div>} />
          <Route path="/register" element={<div>Регистрация</div>} />
          <Route path="/users" element={<div>Пользователи</div>} />
          <Route path="/bids/:bidId" element={<div>Заявка</div>} />
          <Route path="/bid" element={<div>Новая заявка</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
