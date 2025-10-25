import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { server } from "../../bff";
import { editPost, getUsers, setPost } from "../../redux/actions";
import { PRIORITIES, STATUSES } from "../../constants";
import { DeleteBidButton } from "../../components";
import { Button, Input, Form, Select } from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  selectUserId,
  selectUserLogin,
  selectUsersList,
} from "../../redux/selectors";
import { request } from "../../utils/request";
// import "./bid-edit-form.scss";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

export const BidEditForm = ({
  bid: { id, title, content, priority, status, implementer },
  isEditing,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [newPriority, setNewPriority] = useState(priority);
  const [newStatus, setNewStatus] = useState(status);
  const [isDisabled, setIsDisabled] = useState(true);

  //   const handleClickSave = () => {
  //     const { title, content, priority, status } = form.getFieldsValue();

  //     if (isEditing) {
  //       server
  //         .editPost(id, title, content, dbURLs)
  //         .then(({ res }) => {
  //           dispatch(editPost(res));
  //         })
  //         .then(() => {
  //           navigate(`/bid/${id}`);
  //         });
  //     } else {
  //       server.editPost(id, title, content, dbURLs).then(({ res }) => {
  //         dispatch(setPost(res));
  //         navigate(`/bid/${res.id}`);
  //       });
  //     }
  //   };

  useLayoutEffect(() => {
    form.resetFields();

    form.setFieldsValue({
      title: title || "",
      content: content || "",
      status: status || STATUSES[0].id,
      priority: priority || PRIORITIES[0],
      implementer: implementer || currentUserLogin,
    });

    request("api/users").then(({ error, data }) => {
      if (error) {
        // setError(error); *TODO
        setIsLoading(false);
      } else {
        dispatch(getUsers(data));
        // setError(null); *TODO
        // setIsLoading(false); *TODO
      }
    });
  }, [form]);

  const usersList = useSelector(selectUsersList);
  const currentUserLogin = useSelector(selectUserLogin);

  const handlePrioritySelectChange = (value) => {
    if (value === priority) {
      setIsDisabled(true);
      return;
    }
    setNewPriority(value);
    setIsDisabled(false);
  };

  const handleStatusSelectChange = (value) => {
    if (value === status) {
      setIsDisabled(true);
      return;
    }
    setNewStatus(value);
    setIsDisabled(false);
  };

  const handleImplementerSelectChange = (value) => {
    if (value === currentUser) {
      setIsDisabled(true);
      return;
    }
    setNewStatus(value);
    setIsDisabled(false);
  };

  return (
    <article className="bid-edit-form__content">
      <h2 className="blog-bid__title">
        {isEditing ? "Редактировать заявку" : "Добавить новую заявку"}
      </h2>
      <Form
        form={form}
        name="wrap"
        // onFinish={handleClickSave}
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
      >
        <section className="bid-edit-form__title-edit">
          <Form.Item
            name="title"
            label="Заголовок:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Введите заголовок..." />
          </Form.Item>
        </section>

        <section className="bid-edit-form__content-edit">
          <Form.Item
            name="content"
            label="Описание:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              placeholder="Введите описание..."
              autoSize={{
                minRows: 6,
              }}
            />
          </Form.Item>
        </section>

        <section className="bid-edit-form__priority-edit">
          <Form.Item name="priority" label="Приоритет:">
            <Select
              defaultValue={PRIORITIES[priority]}
              onChange={handlePrioritySelectChange}
              options={Object.entries(PRIORITIES).map((priority) => ({
                key: priority[0],
                value: priority[0],
                label: priority[1],
              }))}
            />
          </Form.Item>
        </section>

        <section className="bid-edit-form__status-edit">
          <Form.Item name="status" label="Статус:">
            <Select
              defaultValue={STATUSES[status].id}
              onChange={handleStatusSelectChange}
              options={Object.entries(STATUSES).map((status) => ({
                key: status[0],
                value: status[0],
                label: status[1].id,
              }))}
            />
          </Form.Item>
        </section>

        <section className="bid-edit-form__implementer-edit">
          <Form.Item name="implementer" label="Исполнитель:">
            <Select
              defaultValue={currentUserLogin}
              onChange={handleImplementerSelectChange}
              options={Object.values(usersList).map((user) => ({
                key: user.id,
                value: user.id,
                label: user.login,
              }))}
            />
          </Form.Item>
        </section>

        <section className="bid-edit-form__control-panel">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={isEditing ? <SaveOutlined /> : <SendOutlined />}
            >
              {isEditing ? "Save" : "Publish"}
            </Button>
          </Form.Item>

          {isEditing && <Form.Item>{<DeleteBidButton bidId={id} />}</Form.Item>}
        </section>
      </Form>
    </article>
  );
};
