import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { loginUser, getUser } from '~/api';
import { CustomToast } from '~/components/CustomToast';
import { PageWrapper } from '~/components/PageWrapper';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setloginStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  const LOGGED_IN_MESSAGE: string = 'Allerede logget inn!';
  const SUCCESS_MESSAGE: string = 'Logget inn som ';
  const ERROR_MESSAGE: string = 'Kunne ikke logge inn!';

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (user) {
      setToastMessage(LOGGED_IN_MESSAGE);
      setloginStatus('info');
      setShowToast(true);
      return;
    }
    loginUser(username, password)
      .then((status) => {
        if (status === 202) {
          getUser()
            .then((user) => {
              setUser(user);
              setloginStatus('success');
              setToastMessage(SUCCESS_MESSAGE + user.username);
              setShowToast(true);
              navigate('/');
            })
            .catch((error) => {
              console.log(error);
              setloginStatus('warning');
              setToastMessage(ERROR_MESSAGE);
              setShowToast(true);
            });
        } else {
          setloginStatus('warning');
          setToastMessage(ERROR_MESSAGE);
          setShowToast(true);
        }
      })
      .catch(() => {
        setloginStatus('warning');
        setToastMessage(ERROR_MESSAGE);
        setShowToast(true);
      });
  };
  return (
    <PageWrapper>
      {/* <Container className="mt-5" > */}
      <div style={{ display: 'flex', height: '100%', width: '50%' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-4" controlId="formBasicEmail">
            <Form.Label>Brukernavn</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-4" controlId="formBasicPassword">
            <Form.Label>Passord</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Button className="mt-4" variant="primary" type="submit">
            Logg inn
          </Button>
        </Form>
        <CustomToast
          toastTitle="Innlogging"
          toastMessage={toastMessage}
          variant={loginStatus}
          setToastState={setShowToast}
          toastState={showToast}
        />
        {/* </Container> */}
      </div>
    </PageWrapper>
  );
}
