import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import FooterComp from '~/components/FooterComp';
import NavbarComp from '~/components/NavbarComp';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ActivityForm from './ActivityForm';
import { ApiTestPage } from './ApiTestPage';
import Home from './Home';

function App() {
  return (
    <>
      <Router>
        <NavbarComp></NavbarComp>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activityForm" element={<ActivityForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* following are routes used for testing */}
          <Route path="/testapi" element={<ApiTestPage />} />
        </Routes>
        <FooterComp></FooterComp>
      </Router>
    </>
  );
}

export default App;
