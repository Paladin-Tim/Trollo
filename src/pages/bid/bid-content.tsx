import { PRIORITIES, STATUSES } from "../../constants";

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
  return (
    <>
      <h1>Заявка №{regNumber}</h1>
      <h3>{title}</h3>
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
      </section>
    </>
  );
};
