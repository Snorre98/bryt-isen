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
            const element = document.getElementById('activityPK');

            if (element !== null) {
              const activityId = (element as HTMLInputElement).value;
              getActivity(activityId).then(console.log).catch(console.error);
            } else {
              console.error('Element with ID activityPK not found.');
            }
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
                const updatedActivity = { isReported: true };
                if (typeof activity.id !== 'undefined') {
                  putActivity(activity.id, updatedActivity)
                    .then(console.log)
                    .catch(() => {
                      alert(
                        'Fungerer ikke ennå! Å redigere data krever tillatelser ved bruk av CSRF-tokens, noe vi ikke har satt opp ennå.',
                      );
                    });
                } else {
                  console.error('Activity ID is undefined.');
                }
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
