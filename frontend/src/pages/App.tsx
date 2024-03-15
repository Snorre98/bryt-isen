import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import Signup from './SignupPage';
import ActivityForm from './ActivityForm';
import { ApiTestPage } from './ApiTestPage';
import Home from './Home';
import { BrytisenOutlet } from '~/components/BrytisenOutlet';
import EditActivity from './EditActivity';
import { ActivityDetailPage } from '~/pages/ActivityDetailPage/ActivityDetailPage';
import { ActivitiesContextProvider } from '~/contextProviders/ActivitiesContextProvider';
import { ReviewsContextProvider } from '~/contextProviders/ReviewContextProvider';
import SpinTheWheel from './SpinTheWheel';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BrytisenOutlet />}>
            <Route
              path="/"
              element={
                <ActivitiesContextProvider>
                  <ReviewsContextProvider>
                    <Home />
                  </ReviewsContextProvider>
                </ActivitiesContextProvider>
              }
            />
            <Route path="/activityForm" element={<ActivityForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/testapi" element={<ApiTestPage />} />
            <Route path="/editActivity/:id" element={<EditActivity />} />
            <Route path="/activities/:id" element={<ActivityDetailPage />} />
            <Route path="/spinTheWheel" element={<SpinTheWheel />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
