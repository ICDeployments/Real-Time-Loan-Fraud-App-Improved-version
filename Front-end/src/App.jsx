import Login from "./Login";
import "./App.css";
import "./amplify-config";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from './pages/Layout';
import BankingDashboard from "./pages/BankingDashboard";
import LoanDashboard from "./pages/LoanDashboard";
import MainDashboard from "./pages/MainDashboard";
import { AppProvider } from './context/AppContext';
import './assets/fonts/fonts.css';
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    let title = "App";
    switch (location.pathname) {
      case "/":
        title = "Login";
        break;
      case "/loan-dashboard":
        title = "Loan Dashboard";
        break;
      case "/banking-dashboard":
        title = "Banking Dashboard";
        break;
      default:
        title = "App";
    }
    document.title = title;
  }, [location.pathname]);

  return (
    <AppProvider>
     <Routes>
       <Route path="/" element={<Login/>} />
       <Route element={<Layout />}>
        <Route path="/dashboard" element={<MainDashboard />} />
       <Route path="/banking-dashboard" element={<BankingDashboard />} />
       <Route path="/loan-dashboard" element={<LoanDashboard />} />
       </Route>
     </Routes>
    </AppProvider>
  );
}

export default App;
