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
import SearchComponent from '~/components/SearchComponent';

export function Home() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter, isFilterOn } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  const [search, setSearch] = useState("");

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

  const handleSearch = (term: string) => {
    console.log(term)
    setSearch(term);
  };

  const filteredActivities = activities.filter((activity) => {
    // Filtrering basert på filteret
    const passesFilter = isFilterOn
      ? activityFilter.has(activity.activity_type)
      : true;
  
    // Filtrering basert på søketerm
    const passesSearch = activity.title.toLowerCase().includes(search.toLowerCase());
  
    // Returner true bare hvis både filter og søk passer
    return passesFilter && passesSearch;
  });
  

  return (
    <PageWrapper>
      <input
      className="search"
      type="text"
      placeholder="Søk..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
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
    filteredActivities.map((activity) => (
      <CardComp
        key={activity.id}
        id={activity.id}
        title={activity.title}
        img={activity.activity_image}
        description={activity.details}
        rules={activity.activity_rules}
        activity_type={activity.activity_type}
        owner={activity.owner}
      />
    ))}
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
