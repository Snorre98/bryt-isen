import { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { loginUser, getUser } from '~/api';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState('');
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    loginUser(username, password)
      .then((status) => {
        if (status === 202) {
          getUser().then((user) => {
            setUser(user);
            setLoginFailed('success');
          });
        }
      })
      .catch((error: object) => {
        setLoginFailed('error');
        console.log(error);
      });
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-4" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-4" controlId="formBasicPassword">
          <Form.Label>Passord</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Logg inn
        </Button>
      </Form>
      {loginFailed === 'success' && <Alert variant="success">Bruker logget inn!</Alert>}
      {loginFailed === 'error' && <Alert variant="danger">Noe gikk feil, bruker ikke logget inn</Alert>}
    </Container>
  );
}

export default Login;
