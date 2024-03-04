import { useEffect, useState } from 'react';
import { getActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';
import { CustomToast } from '~/components/CustomToast';

export function Home() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter, isFilterOn } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');

  useEffect(() => {
    getActivities()
      .then((data) => {
        setLoading(false);
        setActivities(data);
      })
      .catch((error) => {
        setShowErrorToast(true);
        setErrorToastMessage('Kunne ikke hente inn aktiviteter!');
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
          {activities.length > 0 &&
            (isFilterOn
              ? activities
                  .filter((activity) => activityFilter.has(activity.activity_type))
                  .map((activity) => (
                    <CardComp
                      key={activity.id}
                      title={activity.title}
                      img={activity.activity_image}
                      description={activity.details}
                      rules={activity.activity_rules}
                      activity_type={activity.activity_type}
                    />
                  ))
              : activities.map((activity) => (
                  <CardComp
                    key={activity.id}
                    title={activity.title}
                    img={activity.activity_image}
                    description={activity.details}
                    rules={activity.activity_rules}
                    activity_type={activity.activity_type}
                  />
                )))}
        </div>
      </div>
      <CustomToast toastTitle="Aktivitet" variant={'info'} toastState={loading} toastMessage={'Laster... '} />
      <CustomToast
        toastTitle="Aktivitet"
        variant={'warning'}
        toastState={showErrorToast}
        toastMessage={errorToastMessage}
      />
    </PageWrapper>
  );
}

export default Home;
