//import { useNavigate } from 'react-router';
//import { error } from 'console';
import { ActivityDto } from '../dto';
import { useEffect, useState } from 'react';
import { getActivities, getActivity, getCsrfToken, putActivity } from '~/api';
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
      <div>
        <button
          onClick={() =>
            getCsrfToken()
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              })
          }
        >
          get CSRF auth token
        </button>
        <input type="number" defaultValue={1} id="activityPK" />
        <button
          onClick={() => {
            // Retrieve the value of the input field
            const activityId = document.getElementById('activityPK')!.value;
            getActivity(activityId).then(console.log).catch(console.error);
          }}
        >
          Trykk - sjekk console{' '}
        </button>
      </div>

      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id}>
            <h3>{activity.name}</h3>
            <p>Details: {activity.details}</p>
            <p>Rules: {activity.activity_rules}</p>
            <p>Type: {activity.activity_type}</p>
            <button
            onClick={() => {
              // Correctly structured object for updating the activity
              const updatedActivity = { isReported: true };

              putActivity(activity.id, updatedActivity)
                .then(console.log)
                .catch(() => {
                  alert('Fungerer ikke ennå! Å redigere data krever tillatelser ved bruk av CSRF-tokens, noe vi ikke har satt opp ennå.');
                });
            }}
          >
            Rapporter
          </button>
          </div>
        ))
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
}
