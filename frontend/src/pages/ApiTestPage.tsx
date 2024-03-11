import {
  getCsrfToken,
  getReportedActivities,
  // getUserActivities,
  postReportedActivity,
} from '~/api';
import { PageWrapper } from '~/components/PageWrapper';

export function ApiTestPage() {
  const handleReportActivity = () => {
    postReportedActivity(1)
      .then(() => {
        console.log('rapportert');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetUserActivities = () => {
    alert('dette fungere ikke helt enda');
    // getUserActivities('snorre98')
    //   .then((response) => {
    //     console.log('henter aktiviterer:', response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleGetReportedActivities = () => {
    getReportedActivities().then((response) => {
      console.log('getReportedActivities response: ', response);
    });
  };
  return (
    <PageWrapper>
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
      <div>
        <button onClick={handleReportActivity}>Report activity by activity id</button>
      </div>
      <div>
        <button onClick={handleGetUserActivities}>Get activities by username</button>
      </div>
      <div>
        <button onClick={handleGetReportedActivities}>Get reported activites</button>
      </div>
    </PageWrapper>
  );
}
