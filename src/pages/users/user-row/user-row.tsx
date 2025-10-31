import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserRole, deleteUser } from "../../../redux/actions";
import { Button, Select } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { request } from "../../../utils/request";

interface Role {
  id: string;
  name: string;
}

interface UserRowProps {
  id: string;
  login: string;
  registeredAt: string;
  roleId: string;
  roles: Role[];
}

export const UserRow = ({
  id,
  login,
  registeredAt,
  roleId,
  roles,
}: UserRowProps) => {
  const [newRoleId, setNewRoleId] = useState(roleId);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleSelectChange = (value: string) => {
    if (value === roleId) {
      setIsDisabled(true);
      return;
    }
    setNewRoleId(value);
    setIsDisabled(false);
  };

  const handleSaveUserClick = () => {
    request(`api/users/${id}`, "PATCH", { roleId: newRoleId }).then(
      ({ data }) => {
        dispatch(saveUserRole(data));
        setIsDisabled(true);
      }
    );
  };

  const handleDeleteUserClick = () => {
    request(`/api/users/${id}`, "DELETE").then(({ data }) => {
      dispatch(deleteUser(data));
    });
  };

  return (
    <section className="userInfo__wrapper">
      <div className="userInfo__login">{login}</div>
      <div className="userInfo__regDate">
        {new Date(registeredAt).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </div>
      <Select
        className="userInfo__role"
        defaultValue={roleId}
        onChange={handleSelectChange}
        options={roles.map(({ id, name }) => ({
          key: id,
          value: id,
          label: name,
        }))}
      />
      <Button
        icon={<SaveOutlined />}
        disabled={isDisabled}
        onClick={handleSaveUserClick}
      ></Button>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDeleteUserClick}
      ></Button>
    </section>
  );
};
