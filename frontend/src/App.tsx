import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NGORegister from "./pages/NGORegister";
import NGOLogin from "./pages/NGOLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DonateFood from "./pages/DonateFood";
import MyDonations from "./pages/MyDonations";
import Tracking from "./pages/Tracking";
import NGOs from "./pages/NGOs";

import DonationMap from "./components/maps/DonationMap";
import TrackingTimeline from "./components/donations/TrackingTimeline";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ngo-register" element={<NGORegister />} />
        <Route path="/ngo-login" element={<NGOLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/ngos" element={<NGOs />} />
        <Route path="/tracking/:id" element={<Tracking />} />
        <Route path="/map/:id" element={<DonationMap />} />
        <Route path="/track/:id" element={<TrackingTimeline />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
