//import { useNavigate } from 'react-router';
import { ActivityDto } from '../dto';
import { useEffect, useState } from 'react';
import { getActivities } from '~/api';
export function ApiTestPage() {
  //const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityDto[]>([]);

  useEffect(() => {
    getActivities()
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id}>
            <h3>{activity.name}</h3>
            <p>Details: {activity.details}</p>
            <p>Rules: {activity.activity_rules}</p>
            <p>Type: {activity.activity_type}</p>
          </div>
        ))
      ) : (
        <p>No activities found.</p>
        // <button onClick={()=> getActivities().then((data)=>{s})}></button>
      )}
    </div>
  );
}
