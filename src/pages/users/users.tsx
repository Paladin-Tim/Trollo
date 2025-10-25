import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import { selectUsersList } from "../../redux/selectors";
import { request } from "../../utils/request";
import { UserRow } from "./user-row/user-row";
import { GlobalError } from "../../components";
import { ROLES } from "../../constants";
import { Loader } from "../../components/Loader";
// import "./users.scss";

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
          <h1>Users</h1>
          <article className="usersTab">
            <section className="usersTab__header">
              <div className="usersTab__colHeader">User name (login)</div>
              <div className="usersTab__colHeader">Registartion date</div>
              <div className="usersTab__colHeader">Role</div>
            </section>
            {isLoading ? (
              <Loader />
            ) : (
              Object.values(usersList).map(
                ({ id, login, registredAt, roleId }) => (
                  <UserRow
                    key={id}
                    id={id}
                    login={login}
                    registredAt={registredAt}
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
