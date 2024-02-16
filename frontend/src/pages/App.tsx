import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import FooterComp from '~/components/FooterComp';
import NavbarComp from '~/components/NavbarComp';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from './SignupPage';
import ActivityForm from './ActivityForm';
import { ApiTestPage } from './ApiTestPage';

function App() {
  return (
    <>
      <Router>
        <Container fluid>
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
        </Container>
      </Router>
    </>
  );
}

export default App;
