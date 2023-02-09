import React, { FC, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

interface MyModalProps {
  info: {
    note?: string;
  };
}

const MyModal: FC<MyModalProps> = ({ info }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{ height: "min-content" }}
        className="btn-sm"
        variant="primary"
        onClick={handleShow}
      >
        info
      </Button>

      <Modal
        className="myModal"
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>{info.note}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
