import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useServer } from "../../hooks";
import { getUsers } from "../../redux/actions";
import { selectUsersList } from "../../redux/selectors";
import { UserRow } from "./user-row/user-row";
// import { ROLE } from "../../bff/constants";
import { GlobalError } from "../../components";
// import "./users.scss";

export const UsersPage = () => {
  const [roles, setRoles] = useState({});
  const [error, setError] = useState(null);

  const usersList = useSelector(selectUsersList);

  const dispatch = useDispatch();

  //   const requestServer = useServer();

  //   useEffect(() => {
  //     Promise.all([
  //       requestServer("fetchUsers"),
  //       requestServer("fetchRoles"),
  //     ]).then(([usersRes, rolesRes]) => {
  //       if (usersRes.error || rolesRes.error) {
  //         setError(usersRes.error || rolesRes.error);
  //         return;
  //       }

  //       dispatch(getUsers(usersRes.res));
  //       setRoles(rolesRes.res[0]);
  //     });
  //   }, [dispatch, requestServer]);

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
            {Object.values(usersList).map(
              ({ id, login, registred_at, role_id }) => (
                <UserRow
                  key={id}
                  id={id}
                  login={login}
                  registredAt={registred_at}
                  roleId={role_id}
                  roles={Object.values(roles).filter(({ id }) => id !== 3)}
                />
              )
            )}
          </article>
        </>
      )}
    </article>
  );
};
