// EditActivityPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditFormComponent from './EditFormComponent'; // Adjust the import path based on your project structure
import { getActivityById } from '~/api'; // Add the API function to get activity by ID

interface EditActivityPageProps {}

const EditActivity: React.FC<EditActivityPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null); // Update with the actual type of your activity

  useEffect(() => {
    // Fetch activity details based on the ID from the URL
    getActivityById(Number(id))
      .then((response) => {
        if (response.status === 200) {
          setActivity(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching activity details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Edit Activity</h2>
      {activity ? (
        <EditFormComponent
          id={activity.id}
          title={activity.title}
          description={activity.description}
          rules={activity.activity_rules}
          activity_type={activity.activity_type}
          onCancel={() => {
            // Handle cancel action, e.g., navigate back or to another page
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditActivity;
