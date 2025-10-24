import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserRole, selectUserLogin } from "../../../redux/selectors";
import { logout } from "../../../redux/actions";
import { Avatar, Button } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const ColorList = [
  "#f56a00",
  "#7265e6",
  "#ffbf00",
  "#00a2ae",
  "#780000ff",
  "#050095ff",
  "#007d15ff",
];

export const ControlPanel = () => {
  const [color, setColor] = useState(ColorList[0]);

  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  useLayoutEffect(() => {
    const randomIndex = Math.floor(Math.random() * ColorList.length);
    setColor(ColorList[randomIndex]);
  }, []);

  return (
    <section className="header__control-panel">
      {roleId === 3 ? (
        <Link to="/login">
          <Button type="primary" icon={<LoginOutlined />}>
            Войти
          </Button>
        </Link>
      ) : (
        <>
          <Avatar
            style={{ backgroundColor: color, verticalAlign: "middle" }}
            size="large"
            gap={2}
          >
            {login}
          </Avatar>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => dispatch(logout())}
          ></Button>
        </>
      )}
    </section>
  );
};
