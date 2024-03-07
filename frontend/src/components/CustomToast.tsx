import { Toast, ToastContainer } from 'react-bootstrap';

type CustomToastProps = {
  toastTitle: string;
  toastMessage: string;
  variant: string;
  toastState: boolean;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CustomToast({ toastTitle, toastMessage, variant, toastState, setToastState }: CustomToastProps) {
  return (
    <>
      <ToastContainer position="top-center">
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
