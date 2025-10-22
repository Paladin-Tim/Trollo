import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/set-user";
import { request } from "../../utils/request";
import { ValidationError } from "../../components";
import { Form, Input, Button } from "antd";
import "./authorization.scss";

export const Authorization = () => {
  const [form] = Form.useForm();

  const [submittable, setSubmittable] = useState(false);
  const [serverError, setServerError] = useState("");

  const formRules = {
    login: [
      { required: true, message: "Заполните поле" },
      {
        pattern: /^[\w]*$/,
        message: "Логин должен содержать только буквы и цифры",
      },
      { min: 3, message: "Логин не должен быть короче 3 символов" },
    ],
    password: [
      { required: true, message: "Заполните поле" },
      { min: 3, message: "Пароль не должен быть короче 3 символов" },
      { max: 20, message: "Пароль не должен быть длинее 20 символов" },
    ],
  };

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = () => {
    const { login, password } = form.getFieldsValue();

    request("/api/login", "POST", { login, password }).then(
      ({ user, error }) => {
        if (error) {
          setServerError(error);
          return;
        }

        dispatch(setUser(user));
        sessionStorage.setItem("userData", JSON.stringify(user));
        form.resetFields();
        navigate("/");
      }
    );
  };

  return (
    <article className="userForm__wrapper">
      <Form
        form={form}
        name="userForm"
        className="userForm"
        validateTrigger="onBlur"
      >
        <h3 className="formTitle">Авторизация</h3>
        <Form.Item name="login" rules={formRules.login}>
          <Input placeholder="Логин"></Input>
        </Form.Item>
        <Form.Item name="password" rules={formRules.password}>
          <Input.Password placeholder="Пароль"></Input.Password>
        </Form.Item>
        <Button
          onClick={onFormSubmit}
          type="primary"
          htmlType="submit"
          className="submitBtn"
          data-focus="0"
          form={form}
          disabled={!submittable}
        >
          Войти
        </Button>
        {serverError && <ValidationError errorText={serverError} />}
        <div className="tip">
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </div>
      </Form>
    </article>
  );
};
