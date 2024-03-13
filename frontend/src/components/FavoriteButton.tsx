import { useEffect, useState } from "react";
import Heart from "react-animated-heart"
import { Button } from "react-bootstrap"
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { postFavoritedActivity, getFavoritedActivities } from "~/api";
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { CustomToast } from '~/components/CustomToast';

export type FavoriteProps = {
    activity_id: number;
  };

function FavoriteButton({activity_id}:FavoriteProps) {
    const { user, setUser } = useAuthContext();
    const [isClick, setClick] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState('');

    //Get all favorite, markere acitivty med hjerte hvis favorited
    useEffect(() => {
    console.log("Nytt kort")
    console.log("User: ",user!.id);
    console.log("Activity: ",activity_id);
    getFavoritedActivities()
    .then((data) => {
        data.forEach((combination) => {
            if (combination.favorited_by_user == user!.id && combination.activity_id == activity_id) {
                setClick(true)
            }
        });
    })
    .catch((error) => {
        setShowErrorToast(true);
        setErrorToastMessage('Kunne ikke hente inn favoriserte aktiviteter!');
        console.log(error);
    });
    }, []);

    const handleFavoritedActivity = (activity_id: number) => {
        if (isClick) {
            //Delete API favorite
            setClick(!isClick)
        } else {
            postFavoritedActivity(activity_id, user!.id)
            .then(() => {
                setClick(!isClick)
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    };


    /* const checkIfFavorite = async () => {
        try {
            // Assuming user!.id and activity_id are correctly defined and accessible here
            const response = await checkFavoriteActivity(user!.id, activity_id);
            setClick(response.isFavorited);
            console.log('Is Favorited:', response.isFavorited);
        } catch (error) {
            console.error('Error checking if activity is favorited:', error);
        }
    }; */

    //checkIfFavorite()
    

    
    
    //postAFavoriteAcitivty(user?.id,activity_id)

    
    return (
        <>
        <div className="test">
            <Heart isClick={isClick} onClick={() => handleFavoritedActivity(activity_id)}/>
        </div>
        </>
    )
}

export default FavoriteButton