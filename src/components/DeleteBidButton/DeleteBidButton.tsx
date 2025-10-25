import { useState } from "react";
import { useDispatch } from "react-redux";
// import { server } from "../../bff";
import { deleteBid } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteBidButton = ({ bidId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showModal = () => {
    setModalOpen(true);
  };

  //   const handleRemovePost = (postId) => {
  //     server.removePost(postId).then(({ res }) => {
  //       dispatch(deletePost(res));
  //     });
  //     setModalOpen(false);
  //     navigate("/");
  //   };

  //   const handleOk = () => {
  //     handleRemovePost(postId);
  //   };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={showModal} />
      <Modal
        title="Delete post"
        open={modalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to delete this post? (This action could not be
          undone)
        </p>
      </Modal>
    </>
  );
};
