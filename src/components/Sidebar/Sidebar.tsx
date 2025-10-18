import { Space, Button } from "antd";
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
      <Space direction="vertical">
        <Logo />
        <Link to="/">
          <Button icon={<FileTextOutlined />}>Заявки</Button>
        </Link>
        <Link to="/users">
          <Button icon={<UserOutlined />}>Сотрудники</Button>
        </Link>
        <Link to="/settings">
          <Button icon={<SettingOutlined />}>Настройки</Button>
        </Link>
      </Space>
    </article>
  );
};
