import { Container } from 'react-bootstrap';
import { PageWrapper } from '~/components/PageWrapper';
import { RegiserUserForm } from '~/components/RegisterUserForm';

function SignupPage() {
  return (
    <PageWrapper>
        <RegiserUserForm />
    </PageWrapper>
  );
}

export default SignupPage;
