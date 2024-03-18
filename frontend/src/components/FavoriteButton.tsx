import { useEffect, useState } from 'react';
import Heart from 'react-animated-heart';
import { postFavoritedActivity, deleteFavoritActivity, getFavoritedActivities } from '~/api';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';

export type FavoriteProps = {
  activity_id: number;
};

function FavoriteButton({ activity_id }: FavoriteProps) {
  const { user, setUser } = useAuthContext();
  const [isClick, setClick] = useState(false);
  const [combinationId, setCombinationId] = useState<number>();

  useEffect(() => {
    getFavoritedActivities()
      .then((data) => {
        data.forEach((combination) => {
          if (combination.owner == user!.id && combination.activity_id == activity_id) {
            setClick(true);
            setCombinationId(combination.id);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isClick]);

  const handleFavoritedActivity = (activity_id: number) => {
    if (isClick) {
      console.log(combinationId);
      deleteFavoritActivity(combinationId!)
        .then(() => {
          setClick(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      postFavoritedActivity(activity_id, user!.id)
        .then(() => {
          setClick(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="test">
        <Heart isClick={isClick} onClick={() => handleFavoritedActivity(activity_id)} />
      </div>
    </>
  );
}

export default FavoriteButton;
