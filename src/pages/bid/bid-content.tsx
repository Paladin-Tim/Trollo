export const BidContent = ({
  bid: {
    id,
    regNumber,
    title,
    content,
    status_id,
    priority_id,
    author_id,
    implementer_id,
    published_at,
  },
}) => {
  return (
    <>
      <h1>Заявка {title}</h1>
      <article className="bid__content"></article>
    </>
  );
};
