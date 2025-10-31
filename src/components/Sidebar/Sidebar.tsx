import { Button } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <article className="sidebar">
      <Logo />
      <section className="sidebar__buttons">
        <Button className="button" icon={<FileTextOutlined />}>
          <Link to="/">Заявки</Link>
        </Button>
        <Button className="button" icon={<UserOutlined />}>
          <Link to="/users">Сотрудники</Link>
        </Button>
        <Button className="button" icon={<SettingOutlined />}>
          <Link to="/settings">Настройки</Link>
        </Button>
      </section>
    </article>
  );
};
