import { RegistrationForm, Login } from "./components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}
