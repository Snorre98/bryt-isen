import React, { useEffect, useState } from 'react';
import WheelOfPrizes from '../components/SpinTheWheelComp';
import { ActivityDto } from '../dto';
import CardComp from '~/components/CardComp';
import '../styles/SpinTheWheel.css';
import { useActivitiesContext } from '~/contextProviders/ActivitiesContextProvider';
import SpinningWheel from '~/assets/spin-the-wheel-2.gif';
import { Button } from 'react-bootstrap';

function SpinTheWheel() {
  const [showActivity, setShowActivity] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<ActivityDto | null>(null);
  const { activities } = useActivitiesContext();

  const selectRandomPrize = () => {
    if (activities?.length === 0) {
      console.error('No activities available.');
      return;
    }

    setIsSpinning(true);
    setShowActivity(false); // Hide the activity card while spinning
    setTimeout(() => {
      const prizeIndex = Math.floor(Math.random() * activities?.length);
      const selectedPrize = activities[prizeIndex];
      if (selectedPrize) {
        setPrize(selectedPrize);
        setShowActivity(true);
      } else {
        console.error('Failed to select a prize.');
      }
      setIsSpinning(false);
    }, 2000);
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
        onClick={selectRandomPrize}
        className="btn btn-primary btn-lg m-2"
        style={{ position: 'absolute', top: '7rem', left: '10rem', zIndex: '10' }}
      >
        Spin the wheel
      </Button>
      <div className="prizes-container">
        {showActivity && prize && (
          <CardComp
            id={prize.id}
            title={prize.title}
            img={prize.activity_image}
            description={prize.details}
            rules={prize.rules}
            activity_type={prize.activity_type}
            owner={prize.owner}
            owner_profile_gradient={prize.owner_profile_gradient}
            owner_username={prize.owner_username}
          />
        )}
      </div>
    </div>
  );
}

export default SpinTheWheel;
