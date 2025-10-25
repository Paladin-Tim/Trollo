import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../redux/selectors";
import { addComment } from "../../redux/actions";
import { request } from "../../utils/request";
import { Comment } from "./comment";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ROLES } from "../../constants";

const { TextArea } = Input;

export const BidComments = ({ comments, bidId }) => {
  const [comment, setComment] = useState("");

  const userRole = useSelector(selectUserRole);

  const dispatch = useDispatch();

  const handleAddComment = (bidId) => {
    request(`/api/bids/${bidId}/comments`, "POST", { content: comment }).then(
      ({ data }) => {
        console.log(data);
        dispatch(addComment(data));
        setComment("");
      }
    );
  };

  return (
    <article className="bid__comments">
      <h2>Комментарии</h2>
      <section className="bid__comments-section">
        <article className="bid__comments-list">
          {Object.values(comments).map(
            ({ id, author, content, publishedAt }) => (
              <Comment
                key={id}
                id={id}
                content={content}
                author_name={author}
                published_at={publishedAt}
                bid_id={bidId}
              />
            )
          )}
        </article>
        {userRole !== ROLES.GUEST && (
          <article className="bid__new-comment">
            <TextArea
              value={comment}
              placeholder="Comment..."
              autoSize={{
                minRows: 4,
              }}
              onChange={({ target }) => setComment(target.value)}
            ></TextArea>
            <Button
              icon={<SendOutlined />}
              onClick={() => handleAddComment(bidId)}
            >
              Send
            </Button>
          </article>
        )}
      </section>
    </article>
  );
};
