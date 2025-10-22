import { useSelector } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../redux/selectors";
// import { ROLE } from "../../bff/constants";
// import { DeleteCommentButton } from "../../components/DeleteCommentButton/DeleteCommentButton";
import { UserOutlined } from "@ant-design/icons";

export const Comment = ({
  id,
  author_name,
  content,
  published_at,
  post_id,
}) => {
  const userLogin = useSelector(selectUserLogin);
  const userRole = useSelector(selectUserRole);

  return (
    <article className="blog-post__comment-wrapper">
      <section className="blog-post__comment">
        <div className="date">{published_at}</div>
        <div className="author">
          <UserOutlined />
          <span>{author_name}</span>
        </div>
        <div className="text">{content}</div>
      </section>
      {/* {(userLogin === author_name || userRole === 0) && (
        <DeleteCommentButton postId={post_id} commentId={id} />
      )} */}
    </article>
  );
};
