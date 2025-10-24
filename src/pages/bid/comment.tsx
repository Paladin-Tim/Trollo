import { useSelector } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../redux/selectors";
import { DeleteCommentButton } from "../../components";
import { UserOutlined } from "@ant-design/icons";
import { convertDate } from "../../utils/convertDate";
import { ROLES } from "../../constants";

export const Comment = ({ id, author_name, content, published_at, bid_id }) => {
  const userLogin = useSelector(selectUserLogin);
  const userRole = useSelector(selectUserRole);

  return (
    <article className="blog-post__comment-wrapper">
      <section className="blog-post__comment">
        <div className="author">
          <UserOutlined />
          <span>{author_name}</span>
        </div>
        <div className="date">
          {convertDate(published_at)}
          прокомментировал(а):
        </div>
        <div className="text">{content}</div>
      </section>
      {(userLogin === author_name || userRole === ROLES.ADMIN) && (
        <DeleteCommentButton postId={bid_id} commentId={id} />
      )}
    </article>
  );
};
