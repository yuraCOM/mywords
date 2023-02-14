import React, { FC, ReactNode } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

interface ToastProps {
  children?: ReactNode;
  show: boolean;
  setShow: (state: boolean) => void;
  txt: string;
  txt1?: string;
  bg: string;
}

const MyToast: FC<ToastProps> = ({ txt, show, setShow, bg }) => {
  return (
    <>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          bg={bg}
        >
          <Toast.Body>
            <p>{txt}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MyToast;
