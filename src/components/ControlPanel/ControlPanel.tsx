import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ControlPanel = () => {
  return (
    <section className="header__control-panel">
      <Link to="/login">
        <Button type="primary" icon={<LoginOutlined />}>
          Войти
        </Button>
      </Link>
    </section>
  );
};
