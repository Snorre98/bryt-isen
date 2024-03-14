import React, { useEffect, useState } from 'react';
import WheelOfPrizes from '../components/SpinTheWheelComp';
import { getActivities } from '../api';
import { ActivityDto } from '../dto';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SpinTheWheel() {

  const [showActivity, setShowActivity] = useState(false);
  const [prize, setPrize] = useState<ActivityDto | null>(null);

  const navigate = useNavigate();

  const handleWin = (prize: ActivityDto) => {
    setPrize(prize);
    setShowActivity(true);
  };

  const handleGoToActivity = () => {
    console.log('Go to activity');
    navigate('/');
  }

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
        {showActivity && prize && (
          <Card style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
            position: 'absolute', // Change fixed to absolute
            top: '30%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Center the card precisely
            boxShadow: '0px 0px 5px #c4c4c4',
            maxHeight: '350px'
          }}>
            <Card.Body>
              <Card.Title>
                <h4>{prize.title}</h4>
                <hr />
              </Card.Title>
              <Card.Img variant="top" src={prize.activity_image} style={{ width: '200px', height: '100px' }} />
              <Card.Text style={{ marginLeft: '0.5rem' }}>Beskrivelse: {prize.details}</Card.Text>
              <Card.Text style={{ marginLeft: '0.5rem' }}>{"Kategori: " + prize.activity_type}</Card.Text>
              <Card.Text style={{ marginLeft: '0.5rem' }}>{"Regler: " + prize.activity_rules}</Card.Text>
            </Card.Body>
          </Card>
        )}
    
        <WheelOfPrizes activities={activities} onWin={handleWin} />
    </div>
  );
}

export default SpinTheWheel;
