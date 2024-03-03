import { useEffect, useState } from 'react';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';

export function Home() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [showFilter, setShowFilter] = useState(false);

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
      <FilterComponent showFilter={showFilter} />
      <div
        className="toggleFilterBtn"
        style={showFilter ? { backgroundColor: '#fcce62' } : { backgroundColor: '#fcce62b7' }}
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter
        <Icon icon="ic:baseline-filter-list" width="32" height="32" style={{ color: 'black' }} />
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="activityCardWrapper">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <CardComp
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
