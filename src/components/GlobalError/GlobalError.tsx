export const GlobalError = ({ error }) => {
  return (
    <article className="content__block error">
      <h2>Error {error.code}</h2>
      <span>{error.text}</span>
    </article>
  );
};
