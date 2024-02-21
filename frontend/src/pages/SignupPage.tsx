import { Container } from 'react-bootstrap';
import { PageWrapper } from '~/components/PageWrapper';
import { RegiserUserForm } from '~/components/RegisterUserForm';

function SignupPage() {
  return (
    <PageWrapper>
      <Container className="mt-5">
        <RegiserUserForm />
      </Container>
    </PageWrapper>
  );
}

export default SignupPage;
