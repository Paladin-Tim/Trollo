import { Space, Button } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Logo } from "./Logo";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <article className="sidebar">
      <Space direction="vertical">
        <Logo />
        <Button icon={<FileTextOutlined />}>Заявки</Button>
        <Button icon={<UserOutlined />}>Сотрудники</Button>
        <Button icon={<SettingOutlined />}>Настройки</Button>
      </Space>
    </article>
  );
};
