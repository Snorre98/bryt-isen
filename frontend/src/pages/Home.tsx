import { useEffect, useState } from 'react';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';

import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
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
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <div className="activityCardWrapper">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <CardComp
                id={activity.id}
                title={activity.title}
                img={activity.activity_image}
                description={activity.details}
                rules={activity.activity_rules}
                activity_type={activity.activity_type}
              ></CardComp>
            ))
          ) : (
            <p>No activities found.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
