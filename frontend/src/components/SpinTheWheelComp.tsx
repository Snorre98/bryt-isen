import React, { useState } from 'react';
import '~/styles/SpinTheWheel.css';
import { ActivityDto } from '~/dto';
import { Button } from 'react-bootstrap';
import SpinningWheel from '~/assets/Spin-the-Wheel.gif';

interface WheelProps {
  activities: ActivityDto[];
  onWin: (prize: ActivityDto) => void; // Callback when a prize is selected
}

const WheelOfPrizes: React.FC<WheelProps> = ({ activities, onWin }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const selectRandomPrize = () => {
    setIsSpinning(true); // Start spinning
    setTimeout(() => {
      const prizeIndex = Math.floor(Math.random() * activities.length); // Randomly select a prize index
      onWin(activities[prizeIndex]); // Invoke the callback with the selected prize
      setIsSpinning(false); // Stop spinning after 2 seconds
    }, 2000); // Wait for 2 seconds
  };

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
