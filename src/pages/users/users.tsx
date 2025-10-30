import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import { selectUsersList } from "../../redux/selectors";
import { request } from "../../utils/request";
import { UserRow } from "./user-row/user-row";
import { GlobalError } from "../../components";
import { ROLES } from "../../constants";
import { Loader } from "../../components/Loader";
import "./users.scss";

export const UsersPage = () => {
  const [roles, setRoles] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const usersList = useSelector(selectUsersList);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([request("./api/users"), request("api/users/roles")]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setError(usersRes.error || rolesRes.error);
          return;
        }

        dispatch(getUsers(usersRes.data));
        setRoles(rolesRes.data);
        setIsLoading(false);
      }
    );
  }, [dispatch]);

  return (
    <article className="usersTab__wrapper">
      {error ? (
        <GlobalError error={error} />
      ) : (
        <>
          <h1>Пользователи</h1>
          <article className="usersTab">
            <section className="usersTab__header">
              <div className="usersTab__colHeader">Имя (логин)</div>
              <div className="usersTab__colHeader">Дата регистрации</div>
              <div className="usersTab__colHeader">Роль</div>
            </section>
            {isLoading ? (
              <Loader />
            ) : (
              Object.values(usersList).map(
                ({ id, login, registeredAt, roleId }) => (
                  <UserRow
                    key={id}
                    id={id}
                    login={login}
                    registeredAt={registeredAt}
                    roleId={roleId}
                    roles={Object.values(roles).filter(
                      ({ id }) => id !== ROLES.GUEST
                    )}
                  />
                )
              )
            )}
          </article>
        </>
      )}
    </article>
  );
};
