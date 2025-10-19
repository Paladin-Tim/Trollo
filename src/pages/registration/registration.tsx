import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/actions/set-user";
// import { server, sessions } from "../../bff";
import { ValidationError } from "../../components";
import { Form, Input, Button } from "antd";
import "../authorization/authorization.scss";

export const Registration = () => {
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
    repeatPassword: [
      { required: true, message: "Заполните поле" },
      { min: 3, message: "Пароль не должен быть короче 3 символов" },
      { max: 20, message: "Пароль не должен быть длинее 20 символов" },
      {
        validator: (_, value) => {
          if (!value || value === form.getFieldValue("password")) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Пароли не совпадают"));
        },
      },
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

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const onFormSubmit = () => {
  //     const { login, password } = form.getFieldsValue();

  //     server.register(login, password).then(({ res, error }) => {
  //       if (error) {
  //         setServerError(error);
  //         return;
  //       }
  //       dispatch(setUser(res));
  //       sessionStorage.setItem(
  //         "userData",
  //         JSON.stringify({ ...sessions.list[res.session], session: res.session })
  //       );
  //       form.resetFields();
  //       navigate("/");
  //     });
  //   };

  return (
    <article className="userForm__wrapper">
      <Form
        form={form}
        name="userForm"
        className="userForm"
        validateTrigger="onBlur"
      >
        <h3 className="formTitle">Регистрация</h3>
        <Form.Item name="login" rules={formRules.login}>
          <Input placeholder="Логин"></Input>
        </Form.Item>
        <Form.Item name="password" rules={formRules.password}>
          <Input.Password placeholder="Пароль"></Input.Password>
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          dependencies={["password"]}
          rules={formRules.repeatPassword}
        >
          <Input.Password placeholder="Повтор пароля"></Input.Password>
        </Form.Item>
        <Button
          //   onClick={onFormSubmit}
          type="primary"
          htmlType="submit"
          className="submitBtn"
          data-focus="0"
          form={form}
          disabled={!submittable}
        >
          Register
        </Button>
        {serverError && <ValidationError errorText={serverError} />}
        <div className="tip">
          Уже есть аккаунт? <Link to="/login">Авторизация</Link>
        </div>
      </Form>
    </article>
  );
};
