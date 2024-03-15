import { Container } from 'react-bootstrap';
import { PageWrapper } from '~/components/PageWrapper';
import { RegiserUserForm } from '~/components/RegisterUserForm';
import { useEffect } from 'react';
import { getActivities } from '~/api';
import { useActivitiesContext } from '~/contextProviders/ActivitiesContextProvider';

function SignupPage() {
  const { activities } = useActivitiesContext();
  console.log('activities:', activities);
  /*useEffect(() => {
    getActivities()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);*/
  return (
    <PageWrapper>
      <RegiserUserForm />
    </PageWrapper>
  );
}

export default SignupPage;
