import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Login } from '../pages/Login';
import Signup from './SignupPage';
import ActivityForm from './ActivityForm';
import { ApiTestPage } from './ApiTestPage';
import Home from './Home';
import { BrytisenOutlet } from '~/components/BrytisenOutlet';
import EditActivity from './EditActivity';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Switch> */}
          <Route element={<BrytisenOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/activityForm" element={<ActivityForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/testapi" element={<ApiTestPage />} />
            <Route path="/editActivity{id}" element={<EditActivity />} />
          </Route>
          {/* </Switch> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
