import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../redux/selectors";
import { logout } from "../../../redux/actions";
import { Button } from "antd";
import { LoginOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

export const ControlPanel = () => {
  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

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
          <Button type="primary" icon={<UserOutlined />}>
            {login}
          </Button>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={dispatch(logout(session))}
          >
            {login}
          </Button>
        </>
      )}
    </section>
  );
};
