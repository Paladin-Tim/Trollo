import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions";
import { request } from "../../utils/request";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteCommentButton = ({ postId, commentId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setModalOpen(true);
  };

  const handleRemoveComment = (postId, commentId) => {
    request(`/api/bids/${postId}/comments/${commentId}`, "DELETE").then(() => {
      dispatch(deleteComment(commentId));
    });

    setModalOpen(false);
  };

  const handleOk = () => {
    handleRemoveComment(postId, commentId);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={showModal} />
      <Modal
        title="Remove comment"
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Remove this comment?</p>
      </Modal>
    </>
  );
};
