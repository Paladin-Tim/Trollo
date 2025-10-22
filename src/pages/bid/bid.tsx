import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setBid } from "../../redux/actions";
import { selectBid } from "../../redux/selectors";
import { BidContent } from "./bid-content";
import { BidComments } from "./bid-comments";

export const Bid = () => {
  const bid = useSelector(selectBid);
  const dispatch = useDispatch();
  const params = useParams();

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setBid(params.id));
  }, [dispatch]);

  return (
    <article className="bid">
      <BidContent bid={bid} />
      <BidComments comments={bid.comments} bidId={bid.id} />
    </article>
  );
};
