import { useEffect, useState } from 'react';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';

export function Home() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter } = useGlobalContext();

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
        style={showFilter ? { backgroundColor: '#fcce62' } : { backgroundColor: '#0089a8', color: 'white' }}
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter
        <Icon icon="ic:baseline-filter-list" width="32" height="32" />
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
            activities
              .filter((activity) => activityFilter.has(activity.activity_type))
              .map((activity) => (
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
