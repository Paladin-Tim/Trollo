import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBids, resetBid } from "../../redux/actions";
import {
  selectBidsList,
  selectSearchPhrase,
  selectUserRole,
} from "../../redux/selectors";
import { request } from "../../utils/request";
import { Loader } from "../../components/Loader";
import { ROLES, STATUSES } from "../../constants";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./main-page.scss";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const bidsList = useSelector(selectBidsList);
  const userRole = useSelector(selectUserRole);
  const searchPhrase = useSelector(selectSearchPhrase);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setIsLoading(true);
    request(`/api/bids?search=${searchPhrase}`)
      .then(({ data: { bids, count } }) => {
        dispatch(getBids(bids));
        dispatch(resetBid());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (searchPhrase === "") {
      setIsSearching(false);
    } else {
      console.log(searchResult);
      setIsLoading(true);
      setIsSearching(true);
      setSearchResult(
        Object.values(bidsList).filter((bid) =>
          bid.title.includes(searchPhrase, 0)
        )
      );
      console.log(searchResult);
      setIsLoading(false);
    }
  }, [searchPhrase]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <article className="content__block add-menu">
            <Link to="/bid">
              <Button disabled={userRole === ROLES.GUEST}>
                Создать заявку
              </Button>
            </Link>
          </article>
          <article className="content__block bids-list-wrapper">
            <article className="bids-list__header">
              <section className="reg-number">Номер</section>
              <section className="title">Название</section>
              <section className="status">Статус</section>
              <section className="implementer">Исполнитель</section>
            </article>
            <article className="bids-list">
              {isSearching
                ? searchResult.map(
                    ({ id, regNumber, status, title, implementer }) => (
                      <Link className="bids-list__link" to={`/bids/${id}`}>
                        <section className="bids-list__item">
                          <section className="reg-number">{regNumber}</section>
                          <h3 className="title">{title}</h3>
                          <section
                            className="status"
                            style={{ background: STATUSES[status].color }}
                          >
                            {STATUSES[status].id}
                          </section>
                          <section className="reg-implementer">
                            {implementer}
                          </section>
                        </section>
                      </Link>
                    )
                  )
                : Object.values(bidsList).map(
                    ({ id, regNumber, status, title, implementer }) => (
                      <Link className="bids-list__link" to={`/bids/${id}`}>
                        <section className="bids-list__item">
                          {/* <section
                        className="badge"
                        style={{ background: STATUSES[status].color }}
                      ></section> */}
                          <section className="reg-number">{regNumber}</section>
                          <h3 className="title">{title}</h3>
                          <section
                            className="status"
                            style={{ background: STATUSES[status].color }}
                          >
                            {STATUSES[status].id}
                          </section>
                          <section className="reg-implementer">
                            {implementer}
                          </section>
                        </section>
                      </Link>
                    )
                  )}
            </article>
          </article>
        </>
      )}
    </>
  );
};
