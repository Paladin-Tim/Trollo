import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, setBid, editBid } from "../../redux/actions";
import { PRIORITIES, STATUSES } from "../../constants";
import { DeleteBidButton } from "../../components";
import { Button, Input, Form, Select } from "antd";
import {
  SaveOutlined,
  SendOutlined,
  StepBackwardOutlined,
} from "@ant-design/icons";
import {
  selectUserId,
  selectUserLogin,
  selectUsersList,
} from "../../redux/selectors";
import { request } from "../../utils/request";
import "./bid-edit-form.scss";

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

interface BidEditFormProps {
  bid: {
    id: string;
    regNumber: string;
    title: string;
    content: string;
    priority: number;
    status: number;
    implementer: string;
  };
  isEditing: boolean;
}

export const BidEditForm = ({
  bid: { id, regNumber, title, content, priority, status, implementer },
  isEditing,
}: BidEditFormProps) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [newPriority, setNewPriority] = useState(priority);
  const [newStatus, setNewStatus] = useState(status);
  const [isDisabled, setIsDisabled] = useState(true);

  const usersList = useSelector(selectUsersList);
  const currentUserLogin = useSelector(selectUserLogin);
  const currentUserId = useSelector(selectUserId);

  const regNumberPlug = new Date().getFullYear() + "/";

  useLayoutEffect(() => {
    form.resetFields();

    form.setFieldsValue({
      regNumber: regNumber || regNumberPlug,
      title: title || "",
      content: content || "",
      status: status || 0,
      priority: priority || PRIORITIES[0],
      implementer: implementer || currentUserId,
    });

    request("api/users").then((response) => {
      // Handle different response structures
      if (response.error) {
        console.log("Has error property");
        // setIsLoading(false);
      } else if (response.data) {
        console.log("Has data property, dispatching");
        dispatch(getUsers(response.data));
        // setIsLoading(false);
      } else if (Array.isArray(response)) {
        console.log("Response is direct array, dispatching");
        dispatch(getUsers(response));
        // setIsLoading(false);
      } else {
        console.log("Unexpected response structure:", response);
        // setIsLoading(false);
      }
    });
  }, [
    form,
    dispatch,
    title,
    content,
    status,
    priority,
    implementer,
    regNumber,
    regNumberPlug,
    currentUserId,
  ]);

  const handleClickSave = () => {
    const { regNumber, title, content, priority, status, implementer } =
      form.getFieldsValue();

    if (isEditing) {
      request(`/api/bids/${id}`, "PATCH", {
        regNumber,
        title,
        content,
        priority,
        status,
        implementer,
      })
        .then(({ data }) => {
          dispatch(editBid(data));
        })
        .then(() => {
          navigate(`/bids/${id}`);
        });
    } else {
      request("/api/bids", "POST", {
        regNumber,
        title,
        content,
        priority,
        status,
        implementer,
      }).then(({ data }) => {
        dispatch(setBid(data));
        navigate(`/bids/${data.id}`);
      });
    }
  };

  const handlePrioritySelectChange = (value: number) => {
    if (value === priority) {
      setIsDisabled(true);
      return;
    }
    setNewPriority(value);
    setIsDisabled(false);
  };

  const handleStatusSelectChange = (value: number) => {
    if (value === status) {
      setIsDisabled(true);
      return;
    }
    setNewStatus(value);
    setIsDisabled(false);
  };

  const handleImplementerSelectChange = (value: number) => {
    if (value === currentUserLogin) {
      setIsDisabled(true);
      return;
    }
    setNewStatus(value);
    setIsDisabled(false);
  };

  return (
    <article className="bid-edit-form__content">
      <section className="bid-edit-form__header">
        <h2 className="bid-edit-form__title">
          {isEditing ? "Редактировать заявку" : "Добавить новую заявку"}
        </h2>
        <Button
          icon={<StepBackwardOutlined />}
          onClick={() => navigate(-1)}
        ></Button>
      </section>
      <Form
        form={form}
        name="wrap"
        onFinish={handleClickSave}
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
        <section className="bid-edit-form__regNumber-edit">
          <Form.Item
            name="regNumber"
            label="Номер заявки:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Введите номер заявки..."
              defaultValue={regNumberPlug}
            />
          </Form.Item>
        </section>

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
          <Form.Item
            name="priority"
            label="Приоритет:"
            rules={[
              {
                required: true,
              },
            ]}
          >
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

        {isEditing && (
          <section className="bid-edit-form__status-edit">
            <Form.Item
              name="status"
              label="Статус:"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                defaultValue={STATUSES[status]}
                onChange={handleStatusSelectChange}
                options={Object.entries(STATUSES).map((status) => ({
                  key: status[0],
                  value: status[0],
                  label: status[1].id,
                }))}
              />
            </Form.Item>
          </section>
        )}

        <section className="bid-edit-form__implementer-edit">
          <Form.Item
            name="implementer"
            label="Исполнитель:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              //   defaultValue={currentUserLogin}
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
