import React, { useEffect, useState } from 'react';
import '../styles/SpinTheWheel.css';
import WheelOfPrizes from '../components/SpinTheWheelComp';
import { getActivities } from '../api';
import { ActivityDto } from '../dto';

function SpinTheWheel() {
  const handleWin = (prize: ActivityDto) => {
    alert(`You won ${prize.title}!`);
  };

  const [activities, setActivities] = useState<ActivityDto[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesData = await getActivities();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    
    fetchActivities();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <WheelOfPrizes activities={activities} onWin={handleWin} />
      </header>
    </div>
  );
}

export default SpinTheWheel;
