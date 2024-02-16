//import React from 'react';
import { Container } from 'react-bootstrap';
import { RegiserUserForm } from '~/components/RegisterUserForm';

function SignupPage() {
  //   const handleSubmit = (event: { preventDefault: () => void }) => {
  //     event.preventDefault();
  //     // Here, you can handle the form submission,
  //     // such as sending the data to a server or validating input.
  //     console.log('Form submitted');
  //   };

  return (
    <Container className="mt-5">
      <RegiserUserForm />
    </Container>
  );
}

export default SignupPage;
