import React, { useEffect, useState } from 'react';
import { ActivityDto, FavoriteDto } from '../dto';
import CardComp from '~/components/CardComp';
import '../styles/SpinTheWheel.css';
import { useActivitiesContext } from '~/contextProviders/ActivitiesContextProvider';
import SpinningWheel from '~/assets/spin-the-wheel-2.gif';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { getActivity, getFavoritedActivities } from '~/api';

function SpinTheWheel() {
  const { user } = useAuthContext();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [favoritesIDs, setFavoritesIDs] = useState<Set<number>>(new Set());
  const [randomActivity, setRandomActivity] = useState<ActivityDto>();
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [gotFavorites, setGotFavorites] = useState<boolean>(false);

  useEffect(() => {
    getFavoritedActivities()
      .then((response: FavoriteDto[]) => {
        const favoriteIDsSet: Set<number> = new Set();
        response.forEach((favoritActivity: FavoriteDto) => {
          if (user && user.id === favoritActivity.owner) {
            favoriteIDsSet.add(favoritActivity.activity_id);
          }
          setFavoritesIDs(favoriteIDsSet);
          if (favoriteIDsSet.size > 0) {
            setGotFavorites(true);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleRandomFavorite = () => {
    const indexArray = Array.from(favoritesIDs);
    const randomIndex = Math.floor(Math.random() * indexArray.length);
    const randomActivityId = indexArray[randomIndex];
    if (randomActivityId) {
      getActivity(randomActivityId)
        .then((response) => {
          console.log(response);
          setIsSpinning(true);
          setShowActivity(false);
          setTimeout(() => {
            setRandomActivity(response);
            setShowActivity(true);
            setIsSpinning(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('TEST');
    }
  };

  return (
    <div className="spwContainer">
      {isSpinning && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
            width: 'auto',
          }}
        >
          <img src={SpinningWheel} alt="Spinning wheel" />
        </div>
      )}
      <Button
        onClick={handleRandomFavorite}
        className="btn btn-primary btn-lg m-2"
        style={{ position: 'absolute', top: '7rem', left: '10rem', zIndex: '10' }}
        disabled={!gotFavorites}
      >
        Spin the wheel
      </Button>
      <div className="prizes-container">
        {showActivity && randomActivity && (
          <CardComp
            id={randomActivity.id}
            title={randomActivity.title}
            img={randomActivity.activity_image}
            description={randomActivity.details}
            rules={randomActivity.activity_rules}
            activity_type={randomActivity.activity_type}
            owner={randomActivity.owner}
            owner_profile_gradient={randomActivity.owner_profile_gradient}
            owner_username={randomActivity.owner_username}
          />
        )}
        {!gotFavorites && <h1>Fant ingen favoritter</h1>}
      </div>
    </div>
  );
}

export default SpinTheWheel;
