import { useState } from "react";
import { useDispatch } from "react-redux";
// import { server } from "../../../bff";
import { saveUserRole, deleteUser } from "../../../redux/actions";
import { Button, Select } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

export const UserRow = ({ id, login, registredAt, roleId, roles }) => {
  const [newRoleId, setNewRoleId] = useState(roleId);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleSelectChange = (value) => {
    if (value === roleId) {
      setIsDisabled(true);
      return;
    }
    setNewRoleId(value);
    setIsDisabled(false);
  };

  //   const handleSaveUserClick = () => {
  //     server.updateUserRole(id, newRoleId).then(({ res }) => {
  //       dispatch(saveUserRole(res));
  //       setIsDisabled(true);
  //     });
  //   };

  //   const handleDeleteUserClick = () => {
  //     server.removeUser(id).then(({ res }) => {
  //       dispatch(deleteUser(res));
  //     });
  //   };

  return (
    <section className="userInfo__wrapper">
      <div className="userInfo__login">{login}</div>
      <div className="userInfo__regDate">{registredAt}</div>
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
        // onClick={handleSaveUserClick}
      ></Button>
      <Button
        icon={<DeleteOutlined />}
        // onClick={handleDeleteUserClick}
      ></Button>
    </section>
  );
};
