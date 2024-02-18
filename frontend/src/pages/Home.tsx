import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';

export function Home() {

  const [activities, setActivities] = useState<ActivityDto[]>([]);

  useEffect(() => {
    getActivities()
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container className='mt-4'>
      <Row className="justify-content-md-center">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <Col>
              <CardComp title={activity.name} img={activity.thumbnail} description={activity.details} rules={activity.activity_rules}></CardComp>
            </Col>
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </Row>
    </Container>

  );
}

export default Home;