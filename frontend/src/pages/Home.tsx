import { useEffect, useState } from 'react';
import { getActivities, getFavoritedActivities } from '~/api';
import CardComp from '~/components/CardComp';
import { ActivityDto } from '../dto';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';
import { CustomToast } from '~/components/CustomToast';
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';

export function Home() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter, isFilterOn } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  const [showFavorites, setShowFavorites] = useState(false); // New state for checkbox
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    getActivities()
      .then((data) => {
        setLoading(false);
        if(showFavorites) {
          getFavoritedActivities().then(favoriteActivities => {
            // Assuming favoriteActivities is an array of objects { activity_id, owner }
            // and data is an array of activity objects with properties { id, owner }
        
            // Filter activities based on matching `id` and `owner` with `activity_id` and `owner` from favoriteActivities
            const filteredActivities = data.filter(activity =>
              favoriteActivities.some(favActivity =>
                favActivity.activity_id == activity.id && favActivity.owner === activity.owner && activity.owner == user?.id
              )
            );
        
            setActivities(filteredActivities);
          }).catch(error => {
            console.error("Could not fetch favorite activities", error);
            // Handle errors or set error state here
          });
        } else {
          setActivities(data);
        }
      })
      .catch((error) => {
        setShowErrorToast(true);
        setErrorToastMessage('Kunne ikke hente inn aktiviteter!');
        console.log(error);
      });
  }, [showFavorites]);

  const handleShowFavoritesChange = (event: any) => {
    setShowFavorites(event.target.checked);
  };

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
        <div>

        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Vis kun favoritter"
          onChange={handleShowFavoritesChange} // Add the onChange handler here
          checked={showFavorites} // Control the checked state
        />

        <br />


        </div>
        <div className="activityCardWrapper">
          {activities.length > 0 &&
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
                    id={activity.id}
                  />
                )))}
        </div>
      </div>
      <CustomToast
        toastTitle="Aktivitet"
        variant={'info'}
        toastState={loading}
        toastMessage={'Laster... '}
        setToastState={setLoading}
      />
      <CustomToast
        toastTitle="Aktivitet"
        variant={'warning'}
        toastState={showErrorToast}
        toastMessage={errorToastMessage}
        setToastState={setShowErrorToast}
      />
    </PageWrapper>
  );
}

export default Home;
