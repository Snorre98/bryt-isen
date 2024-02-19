import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';

import '../styles/Home.css';
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
    <Container className="mt-4" style={{ display: 'felx', alignItems: 'center', justifyContent: 'center' }}>
      <div className="activityCardWrapper">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <CardComp
              title={activity.title}
              img={activity.activity_image}
              description={activity.details}
              rules={activity.activity_rules}
            ></CardComp>
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </div>
    </Container>
  );
}

export default Home;
