import React, { useEffect, useState } from 'react';
import WheelOfPrizes from '../components/SpinTheWheelComp';
import { getActivities } from '../api';
import { ActivityDto } from '../dto';
import CardComp from '~/components/CardComp';
import '../styles/SpinTheWheel.css';

function SpinTheWheel() {

  const [showActivity, setShowActivity] = useState(false);
  const [prize, setPrize] = useState<ActivityDto | null>(null);
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [error, setError] = useState<string | null>(null); // Add state for error handling

  const handleWin = (prize: ActivityDto) => {
    setPrize(prize);
    setShowActivity(true);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setShowActivity(false); // Reset showActivity when fetching new activities
      try {
        const activitiesData = await getActivities();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Error fetching activities. Please try again later.'); // Set error message
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container">
      {error && <p>{error}</p>} {/* Display error message */}
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
          />
          )}
          <WheelOfPrizes activities={activities} onWin={handleWin} />
      </div>
    </div>
  );
}

export default SpinTheWheel;
