import { Alert } from 'react-bootstrap';

type AlertComponentProps = {
  text: string;
  variant: string;
};

export function AlertComponent({ variant, text }: AlertComponentProps) {
  return (
    <>
      <Alert variant={variant} style={{ position: 'fixed', top: '100px', right: '50px' }}>
        {text}
      </Alert>
    </>
  );
}
