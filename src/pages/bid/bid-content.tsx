import { useSelector } from "react-redux";
import { PRIORITIES, ROLES, STATUSES } from "../../constants";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../redux/selectors";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DeleteBidButton } from "../../components";

export const BidContent = ({
  bid: {
    id,
    regNumber,
    title,
    content,
    status,
    priority,
    author,
    implementer,
    publishedAt,
  },
}) => {
  const userRole = useSelector(selectUserRole);

  const navigate = useNavigate();

  return (
    <>
      <h1>Заявка №{regNumber}</h1>
      <h3>{title}</h3>
      {userRole === ROLES.ADMIN && (
        <section className="bid__menu">
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/bid/${id}/edit`)}
          ></Button>
          <DeleteBidButton bidId={id} />
        </section>
      )}
      <section className="bid__content">{content}</section>
      <section className="bid__info">
        <section>Приоритет: {PRIORITIES[priority]}</section>
        <section>Создана: {author}</section>
        <section>
          Дата создания:{" "}
          {new Date(publishedAt).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </section>
        <section className="bid__status">
          Статус:
          <div
            className="status__tag"
            style={{ background: STATUSES[status].color }}
          ></div>
          <div className="status__text">{STATUSES[status].id}</div>
        </section>
        <section>Исполнитель: {implementer}</section>
      </section>
    </>
  );
};
