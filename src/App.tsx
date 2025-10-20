import { Routes, Route } from "react-router-dom";
import { Header, Sidebar, PageContent } from "./components";
import { Authorization, Registration, UsersPage } from "./pages";
import "./App.scss";

export const App = () => {
  return (
    <article className="app-wrapper">
      <Sidebar />
      <PageContent>
        <Header />
        <article className="content">
          <Routes>
            <Route path="/" element={<div>Главная</div>} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/bids/:bidId" element={<div>Заявка</div>} />
            <Route path="/bid" element={<div>Новая заявка</div>} />
            <Route path="/settings" element={<div>Настройки</div>} />
            <Route path="*" element={<div>Ошибка</div>} />
          </Routes>
        </article>
      </PageContent>
    </article>
  );
};
