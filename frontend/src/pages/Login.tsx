import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function Login() {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Here, you can handle the form submission,
    // such as sending the data to a server or validating input.
    console.log("Form submitted");
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-4" controlId="formBasicEmail">
          <Form.Label>Epost</Form.Label>
          <Form.Control type="email" placeholder="ola@nordman.no" required />
        </Form.Group>

        <Form.Group className="mt-4" controlId="formBasicPassword">
          <Form.Label>Passord</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Logg inn
        </Button>
      </Form>
    </Container>
  );
}

export default Login;