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
    implementer_id,
    publishedAt,
  },
}) => {
  return (
    <>
      <h1>Заявка №{regNumber}</h1>
      <h3>{title}</h3>
      <section className="bid__content">{content}</section>
      <section className="bid__info">
        <section>Приоритет {PRIORITIES[priority]}</section>
        <section>Создана {author}</section>
        <section>Дата создания: {publishedAt.slice(0, 10)}</section>
        <section>Статус {STATUSES[status]}</section>
      </section>
    </>
  );
};
