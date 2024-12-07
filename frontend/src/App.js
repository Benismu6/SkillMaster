import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SkillsDashboard from './pages/SkillsDashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LockpickingClass from './pages/LockpickingClass';
import ProviderSettings from './pages/ProviderSettings';
import SeekerSettings from './pages/SeekerSettings';
import ProfilePersonalProvider from './pages/ProfilePersonalProvider';
import ProfilePublicProvider from './pages/ProfilePublicProvider';
import AddService from './pages/AddService';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/skills-dashboard" element={<SkillsDashboard />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lockpicking-class" element={<LockpickingClass />} />
          <Route path="/provider-settings" element={<ProviderSettings />} />
          <Route path="/seeker-settings" element={<SeekerSettings />} />
          <Route path="/profile-provider" element={<ProfilePersonalProvider />} />
          <Route path="/public-provider" element={<ProfilePublicProvider />} />
          <Route path="/add-service" element={<AddService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
