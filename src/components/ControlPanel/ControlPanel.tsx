import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

export const ControlPanel = () => {
  return (
    <section className="header__control-panel">
      <Button type="primary" icon={<LoginOutlined />}>
        Войти
      </Button>
    </section>
  );
};
