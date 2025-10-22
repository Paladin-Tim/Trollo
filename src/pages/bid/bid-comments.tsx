import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserId,
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from "../../redux/selectors";
import { addComment } from "../../redux/actions";
// import { server } from "../../bff";
// import { ROLE } from "../../bff/constants";
import { Comment } from "./comment";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const BidComments = ({ comments, postId }) => {
  const [comment, setComment] = useState("");

  const userId = useSelector(selectUserId);
  const userLogin = useSelector(selectUserLogin);
  const userRole = useSelector(selectUserRole);

  const dispatch = useDispatch();

  //   const handleAddComment = (postId) => {
  //     server.addComment(postId, userId, userLogin, comment).then(({ res }) => {
  //       dispatch(addComment(res));
  //       setComment("");
  //     });
  //   };

  return (
    <article className="blog-post__comments">
      <h2>Comments</h2>
      <section className="blog-post__comments-section">
        <article className="blog-post__comments-list">
          {Object.values(comments).map(
            ({ id, author_name, content, published_at }) => (
              <Comment
                key={id}
                id={id}
                content={content}
                author_name={author_name}
                published_at={published_at}
                post_id={postId}
              />
            )
          )}
        </article>
        {userRole !== 3 && (
          <article className="blog-post__new-comment">
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
              //   onClick={() => handleAddComment(postId)}
            >
              Send
            </Button>
          </article>
        )}
      </section>
    </article>
  );
};
