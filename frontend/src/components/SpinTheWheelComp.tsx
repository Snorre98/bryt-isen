import React from 'react';
import '~/styles/SpinTheWheel.css';
import { ActivityDto } from '~/dto';
import { Button } from 'react-bootstrap';

interface WheelProps {
  activities: ActivityDto[];
  onWin: (prize: ActivityDto) => void; // Callback when a prize is selected
}

const WheelOfPrizes: React.FC<WheelProps> = ({ activities, onWin }) => {

  const selectRandomPrize = () => {
    const prizeIndex = Math.floor(Math.random() * activities.length); // Randomly select a prize index
    onWin(activities[prizeIndex]); // Invoke the callback with the selected prize
  };

  return (
    <div className="button-container">
      <Button type="button" onClick={selectRandomPrize} className="btn btn-primary btn-lg m-2">
          Spin the wheel
      </Button>
    </div>
  );
};

export default WheelOfPrizes;
