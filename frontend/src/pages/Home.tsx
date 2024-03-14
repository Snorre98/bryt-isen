import { useState } from 'react';

import CardComp from '~/components/CardComp';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';
import { useActivitiesContext } from '~/contextProviders/ActivitiesContextProvider';

export function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter, isFilterOn } = useGlobalContext();
  const { activities } = useActivitiesContext();

  return (
    <PageWrapper>
      <FilterComponent showFilter={showFilter} />
      <div
        className="toggleFilterBtn"
        style={showFilter ? { backgroundColor: '#fcce62' } : { backgroundColor: '#0089a8', color: 'white' }}
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter
        {isFilterOn ? (
          <Icon icon="ic:baseline-filter-list" width="32" height="32" />
        ) : (
          <Icon icon="ic:baseline-filter-list-off" width="32" height="32" />
        )}
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
          {activities &&
            activities.length > 0 &&
            (isFilterOn
              ? activities
                  .filter((activity) => activityFilter.has(activity.activity_type))
                  .map((activity) => (
                    <CardComp
                      key={activity.id}
                      id={activity.id}
                      title={activity.title}
                      img={activity.activity_image}
                      description={activity.details}
                      rules={activity.activity_rules}
                      activity_type={activity.activity_type}
                      owner={activity.owner}
                      owner_username={activity.owner_username}
                      owner_profile_gradient={activity.owner_profile_gradient}
                    />
                  ))
              : activities.map((activity) => (
                  <CardComp
                    key={activity.id}
                    id={activity.id}
                    title={activity.title}
                    img={activity.activity_image}
                    description={activity.details}
                    rules={activity.activity_rules}
                    activity_type={activity.activity_type}
                    owner={activity.owner}
                    owner_username={activity.owner_username}
                    owner_profile_gradient={activity.owner_profile_gradient}
                  />
                )))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
