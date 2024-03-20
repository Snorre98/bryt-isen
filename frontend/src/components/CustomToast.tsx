import { Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';

type CustomToastProps = {
  position: string;
  toastTitle: string;
  toastMessage: string;
  variant: string;
  toastState: boolean;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CustomToast({
  toastTitle,
  toastMessage,
  variant,
  toastState,
  setToastState,
  position = 'top-center',
}: CustomToastProps) {
  return (
    <>
      <ToastContainer
        // @ts-expect-error
        position={position}
        className="p-3"
        style={{ zIndex: 100000 }}
      >
        <Toast onClose={() => setToastState(false)} show={toastState} delay={3000} autohide bg={variant}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{toastTitle}</strong>
          </Toast.Header>
          <Toast.Body>
            <h5>{toastMessage}</h5>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
