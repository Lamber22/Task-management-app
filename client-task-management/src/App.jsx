import { SignUpForm, Login } from "./components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}


// import LandingPage from './pages/LandingPage';
// import { SignUpForm, Login } from './components';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<SignUpForm />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
