import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Sidebar } from "./components";
import { Authorization } from "./pages";
import "./App.scss";

export const App = () => {
  return (
    <article className="app-wrapper">
      <Sidebar />
      <main className="main">
        <Header />
        <article className="content">
          <Routes>
            <Route path="/" element={<div>Главная</div>} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/register" element={<div>Регистрация</div>} />
            <Route path="/users" element={<div>Пользователи</div>} />
            <Route path="/bids/:bidId" element={<div>Заявка</div>} />
            <Route path="/bid" element={<div>Новая заявка</div>} />
            <Route path="/settings" element={<div>Настройки</div>} />
            <Route path="*" element={<div>Ошибка</div>} />
          </Routes>
        </article>
      </main>
    </article>
  );
};
