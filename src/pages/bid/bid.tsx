import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { setBid } from "../../redux/actions";
import { selectBid, selectUserRole } from "../../redux/selectors";
import { BidContent } from "./bid-content";
import { BidComments } from "./bid-comments";
import { Loader } from "../../components/Loader";
import { GlobalError } from "../../components";
import { request } from "../../utils/request";

export const Bid = () => {
  const bid = useSelector(selectBid);
  const dispatch = useDispatch();
  const params = useParams();

  const userRole = useSelector(selectUserRole);

  const isCreating = useMatch("/bid");
  const isEditing = useMatch("/bid/:id/edit");

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    request(`/api/bids/${params.id}`).then(({ error, data }) => {
      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        dispatch(setBid(data));
        setError(null);
        setIsLoading(false);
      }
    });
  }, [isCreating, dispatch, params.id]);

  return (
    <>
      {isCreating || isEditing ? (
        userRole !== 0 ? (
          <GlobalError error={globalErrors.ACCESS_DENIED} />
        ) : error ? (
          <GlobalError error={error} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <article className="content__block post-edit-form">
            {/* <PostEditForm post={post} isEditing={isEditing} /> */}
          </article>
        )
      ) : error ? (
        <GlobalError error={error} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <article className="bid">
          <BidContent bid={bid} />
          <BidComments comments={bid.comments} bidId={bid.id} />
        </article>
      )}
    </>
  );
};
