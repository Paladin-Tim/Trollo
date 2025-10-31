import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBid } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { request } from "../../utils/request";

interface DeleteBidButtonProps {
  bidId: string;
}

export const DeleteBidButton = ({ bidId }: DeleteBidButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showModal = () => {
    setModalOpen(true);
  };

  const handleRemoveBid = async (bidId: string) => {
    try {
      await request(`/api/bids/${bidId}`, "DELETE");

      // If we get here, deletion was successful
      dispatch(deleteBid(bidId));
      setModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting bid:", error);
      setModalOpen(false);
    }
  };

  const handleOk = () => {
    handleRemoveBid(bidId);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={showModal} />
      <Modal
        title="Delete post"
        open={modalOpen}
        onOk={handleOk}
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
