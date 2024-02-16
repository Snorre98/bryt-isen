import axios from 'axios';
//import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getCsrfToken } from '~/api';
export function ApiTestPage() {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <button
            onClick={() => {
              getCsrfToken()
                .then((token) => {
                  alert('Got token');
                  axios.defaults.headers.common['X-CSRFToken'] = token;
                  alert('Got token');
                })
                .catch(console.error);
            }}
          >
            getCsrf
          </button>
        </Col>
        <Col></Col>
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
