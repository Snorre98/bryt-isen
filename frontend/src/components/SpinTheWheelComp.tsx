import React, { useState } from 'react';
import '~/styles/SpinTheWheel.css';
import { ActivityDto, FavoriteDto } from '~/dto';
import { Button } from 'react-bootstrap';
import SpinningWheel from '~/assets/Spin-the-Wheel.gif';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { getActivity, getFavoritedActivities } from '~/api';

interface WheelProps {
  activities: ActivityDto[];
  onWin: (prize: ActivityDto) => void; // Callback when a prize is selected
}

const WheelOfPrizes: React.FC<WheelProps> = ({ activities, onWin }) => {
  const { user } = useAuthContext();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [favoritesIDs, setFavoritesIDs] = useState<Set<number>>(new Set());
  const [randomActivity, setRandomActivity] = useState<ActivityDto>();

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

  const handleRandomFavorite = () => {
    setIsSpinning(true);
    getFavoritedActivities()
      .then((response: FavoriteDto[]) => {
        filterFavorites(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const indexArray = Array.from(favoritesIDs);
    const randomIndex = Math.floor(Math.random() * indexArray.length);
    const randomActivityId = indexArray[randomIndex];
    getActivity(randomActivityId)
      .then((response) => {
        setRandomActivity(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
  const selectRandomPrize = () => {
    setIsSpinning(true); // Start spinning
    const randomIndex = Math.floor(Math.random() * activities.length);
    const randomFavoriteId = fav;

    setTimeout(() => {
      const prizeIndex = Math.floor(Math.random() * activities.length); // Randomly select a prize index
      onWin(activities[prizeIndex]); // Invoke the callback with the selected prize
      setIsSpinning(false); // Stop spinning after 2 seconds
    }, 2000); // Wait for 2 seconds
  };*/

  return (
    <div className="button-container">
      {isSpinning && <img src={SpinningWheel} alt={'Spinning wheel'} />}
      <Button
        type="button"
        onClick={selectRandomPrize}
        className="btn btn-primary btn-lg m-2"
        style={{ top: '0', left: '0' }}
      >
        Spin the wheel
      </Button>
    </div>
  );
};

export default WheelOfPrizes;
