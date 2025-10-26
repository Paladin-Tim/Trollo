import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBids } from "../../redux/actions";
import { selectBidsList } from "../../redux/selectors";
import { request } from "../../utils/request";
import { Loader } from "../../components/Loader";
import "./main-page.scss";
import { STATES } from "mongoose";
import { STATUSES } from "../../constants";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const bidsList = useSelector(selectBidsList);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setIsLoading(true);
    request("/api/bids")
      .then(({ data: { bids, count } }) => {
        dispatch(getBids(bids));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="content__block bids-list-wrapper">
          <article className="bids-list__header">
            <section className="reg-number">Номер</section>
            <section className="title">Название</section>
            <section className="status">Статус</section>
            <section className="implementer">Исполнитель</section>
          </article>
          <article className="bids-list">
            {Object.values(bidsList).map(({ id, regNumber, status, title }) => (
              <Link className="bids-list__link" to={`/bids/${id}`}>
                <section className="bids-list__item">
                  <section
                    className="badge"
                    style={{ background: STATUSES[status].color }}
                  ></section>
                  <section className="reg-number">{regNumber}</section>
                  <h3 className="title">{title}</h3>
                  <section
                    className="status"
                    style={{ background: STATUSES[status].color }}
                  >
                    {STATUSES[status].id}
                  </section>
                </section>
              </Link>
            ))}
          </article>
        </article>
      )}
    </>
  );
};
