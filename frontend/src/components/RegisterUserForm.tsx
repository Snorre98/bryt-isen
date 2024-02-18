import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { RegisterUserDto } from '~/dto';
import { registerUser } from '~/api';
import { AlertComponent } from './AlertComponent';

export function RegiserUserForm() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegistration = (event) => {
    event.preventDefault();
    const userData: RegisterUserDto = { username, first_name, last_name, password };
    registerUser(userData)
      .then(() => {
        setRegistrationStatus('success');
      })
      .catch((error) => {
        console.log(error);
        setRegistrationStatus('error');
      });
  };

  return (
    <>
      <Form onSubmit={handleRegistration}>
        <Form.Group className="mb-3" controlId="formRegisterUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="username"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setUsername(inputValue);
            }}
          />
          <Form.Label>Forname</Form.Label>
          <Form.Control
            required
            //value={forname}
            type="text"
            placeholder="Forname"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setFirstname(inputValue);
            }}
          />
          <Form.Label>Lastname</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Lastname"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setLastname(inputValue);
            }}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Password"
            onChange={(event) => {
              const inputValue: unknown = event.target.value;
              setPassword(inputValue);
            }}
          />
          <Form.Text>
            <h3> ⚠️ Ikke registerer med brukernavn og passord du bruker eller ville brukt andre plasser ⚠️</h3>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrer
        </Button>
      </Form>
      {registrationStatus === 'success' && <AlertComponent variant="success" text="Bruker opprettet!" />}
      {registrationStatus === 'error' && (
        <AlertComponent variant="danger" text="Noe gikk feil, bruker ikke opprettet." />
      )}
    </>
  );
}
