import { useSelector } from "react-redux";
import { PRIORITIES, ROLES, STATUSES } from "../../constants";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../redux/selectors";
import { Button } from "antd";
import { EditOutlined, StepBackwardOutlined } from "@ant-design/icons";
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
      <section className="bid__header">
        <h2>№ {regNumber}</h2>
        <h3>{title}</h3>
        <section className="bid__menu">
          <Button
            icon={<StepBackwardOutlined />}
            onClick={() => navigate(-1)}
          ></Button>
          {userRole === ROLES.ADMIN && (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => navigate(`/bid/${id}/edit`)}
              ></Button>
              <DeleteBidButton bidId={id} />
            </>
          )}
        </section>
      </section>
      <section className="bid__main">
        <section className="bid__content">{content}</section>
        <section className="bid__info">
          <section className="bid__status">
            Статус:{" "}
            <div
              className="status__tag"
              style={{ background: STATUSES[status].color }}
            ></div>
            <div className="status__text">{STATUSES[status].id}</div>
          </section>
          <section>Создана: {author}</section>
          <section>
            Дата создания:{" "}
            {new Date(publishedAt).toLocaleDateString("default", {
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </section>
          <section>Исполнитель: {implementer}</section>
          <section>Приоритет: {PRIORITIES[priority]}</section>
        </section>
      </section>
    </>
  );
};
