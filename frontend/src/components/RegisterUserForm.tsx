import { SetStateAction, useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { RegisterUserDto } from '~/dto';
import { getUser, registerUser } from '~/api';
import { AlertComponent } from './AlertComponent';
import { CustomToast } from './CustomToast';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

export function RegiserUserForm() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();

  const SUCCESS_MESSAGE: string = 'Bruker registrert';
  const ERROR_MESSAGE: string = 'Kunne ikke registrere bruker';
  const LOGG_OUT: string = 'Logg ut for å registrer bruker';
  const USER_EXCISTS: string = 'Username is taken!';

  const handleRegistration = (event) => {
    event.preventDefault();
    if (user) {
      setRegistrationStatus('info');
      setToastMessage(LOGG_OUT);
      setShowToast(true);
      return;
    }

    const userData: RegisterUserDto = { username, first_name, last_name, password };
    registerUser(userData)
      .then((response) => {
        if (response.status === 202) {
          setRegistrationStatus('success');
          setToastMessage(SUCCESS_MESSAGE);
          setShowToast(true);
          getUser().then((user) => {
            setUser(user);
          });
          navigate('/');
        } else if (response.status === 400) {
          //TODO make this work
          setRegistrationStatus('info');
          setToastMessage(USER_EXCISTS);
          setShowToast(true);
        }
      })
      .catch((error) => {
        setRegistrationStatus('warning');
        setToastMessage(ERROR_MESSAGE);
        setShowToast(true);
        console.log(error);
      });
  };

  return (
    <><div style={{ display: 'flex', height: '100%', width: '50%' }}>
      <Form onSubmit={handleRegistration}>
        <Form.Group className="mb-3" controlId="formRegisterUser">
          <Form.Label>Brukernavn</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setUsername(inputValue);
            }}
          />
          <Form.Label>Fornavn</Form.Label>
          <Form.Control
            required
            //value={forname}
            type="text"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setFirstname(inputValue);
            }}
          />
          <Form.Label>Etternavn</Form.Label>

          <Form.Control
            required
            type="text"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setLastname(inputValue);
            }}
          />
          <Form.Label>Passord</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setPassword(inputValue);
            }}
          />
          {/* <Form.Text>
            <h3> ⚠️ Ikke registerer med brukernavn og passord du bruker eller ville brukt andre plasser ⚠️</h3>
          </Form.Text> */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrer
        </Button>
      </Form>
      <CustomToast
        toastTitle="Registrer bruker"
        toastMessage={toastMessage}
        variant={registrationStatus}
        setToastState={setShowToast}
        toastState={showToast}
      /></div>
    </>
  );
}
