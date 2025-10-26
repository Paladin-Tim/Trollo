import { Routes, Route } from "react-router-dom";
import { Header, Sidebar, PageContent } from "./components";
import { Authorization, Registration, UsersPage, Bid, MainPage } from "./pages";
import { useLayoutEffect } from "react";
import { setUser } from "./redux/actions";
import { useDispatch } from "react-redux";
import "./App.scss";

export const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserData = JSON.parse(sessionStorage.getItem("userData"));

    if (!currentUserData) {
      return;
    }

    dispatch(setUser(currentUserData));
  }, [dispatch]);

  return (
    <article className="app-wrapper">
      <Sidebar />
      <PageContent>
        <Header />
        <article className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/bids/:id" element={<Bid />} />
            <Route path="/bid/:id/edit" element={<Bid />} />
            <Route path="/bid" element={<Bid />} />
            <Route path="/settings" element={<div>Настройки</div>} />
            <Route path="*" element={<div>Ошибка</div>} />
          </Routes>
        </article>
      </PageContent>
    </article>
  );
};
