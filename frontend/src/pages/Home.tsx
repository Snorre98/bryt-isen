import { useState } from 'react';
import { getFavoritedActivities } from '~/api';
import CardComp from '~/components/CardComp';
import '../styles/Home.css';
import { PageWrapper } from '~/components/PageWrapper';
import { Icon } from '@iconify/react';
import FilterComponent from '~/components/FilterComponent/FilterComponent';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { useActivitiesContext } from '~/contextProviders/ActivitiesContextProvider';
import { FavoriteDto } from '~/dto';

export function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const { activityFilter, isFilterOn } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [showFavorites, setShowFavorites] = useState(false); // New state for checkbox
  const { user } = useAuthContext();
  const { activities } = useActivitiesContext();
  const [favoritesIDs, setFavoritesIDs] = useState<Set<number>>(new Set());

  /*
   * This creates a set with the IDs of the activities that the logged-in user has favorite.
   * */
  const filterFavorites = (favoriteActivities: FavoriteDto[]) => {
    const favoriteIDsSet: Set<number> = new Set();
    favoriteActivities.forEach((favoritActivity: FavoriteDto) => {
      if (user && user.id === favoritActivity.owner) {
        favoriteIDsSet.add(favoritActivity.activity_id);
      }
      setFavoritesIDs(favoriteIDsSet);
    });
  };
  const handleShowFavorites = () => {
    if (!showFavorites) {
      getFavoritedActivities()
        .then((response) => {
          filterFavorites(response);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowFavorites(!showFavorites);
  };

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  const filteredActivities = (activities || []).filter((activity): boolean => {
    const passesFilter = isFilterOn ? activityFilter.has(activity.activity_type) : true;
    const passesSearch = activity.title.toLowerCase().includes(search.toLowerCase());
    const isFavorited = showFavorites ? favoritesIDs.has(activity.id) : true;
    return passesFilter && passesSearch && isFavorited;
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
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Vis kun favoritter"
        onChange={handleShowFavorites}
        checked={showFavorites}
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
        <div>
          <br />
        </div>
        <div className="activityCardWrapper">
          {activities &&
            activities.length > 0 &&
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
                owner_username={activity.owner_username}
                owner_profile_gradient={activity.owner_profile_gradient}
              />
            ))}
        </div>
      </div>
    </PageWrapper>
  );
}
export default Home;
