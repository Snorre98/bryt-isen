import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getCsrfToken, registerUser } from '~/api';
export function ApiTestPage() {
  const [username, setUsername] = useState('');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = async () => {
    try {
      const status = await registerUser(username, givenName, surname, password);
      console.log('Registration successful with status:', status);
      // Handle success (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show error message)
    }
  };
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <button
            onClick={() => {
              getCsrfToken()
                .then((token) => {
                  // Update axios globally with new token.
                  console.log(token);
                  axios.defaults.headers.common['X-CSRFToken'] = token;
                })
                .catch(console.error);
            }}
          >
            getCsrf
          </button>
        </Col>
        <Col>
          <button
            onClick={() => {
              registerUser('Ravine7379', 'snorre', 'givenName', '856gVboWKwa%**')
                .then((token) => {
                  // Update axios globally with new token.
                  axios.defaults.headers.common['X-CSRFToken'] = token;
                })
                .catch(console.error);
            }}
          >
            registerUser
          </button>
        </Col>
        <Col>
          <Button variant="success">login</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="danger">logout</Button>
        </Col>
        <Col>
          <Button variant="warning">Button 5</Button>
        </Col>
        <Col>
          <Button variant="info">Button 6</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="danger">Button 4</Button>
        </Col>
        <Col>
          <Button variant="warning">Button 5</Button>
        </Col>
        <Col>
          <Button variant="info">Button 6</Button>
        </Col>
      </Row>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Given Name" value={givenName} onChange={(e) => setGivenName(e.target.value)} />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleRegisterClick}>Register</Button>
      </div>
    </Container>
  );
}
