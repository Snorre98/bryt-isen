//import React from 'react';
import { Container } from 'react-bootstrap';
import { RegiserUserForm } from '~/components/RegisterUserForm';

function SignupPage() {
  return (
    <Container className="mt-5">
      <RegiserUserForm />
    </Container>
  );
}

export default SignupPage;
