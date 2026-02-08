import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/Livefeed";
import HistoryLogs from "./pages/HistoryLogs";
import RealTimeAlerts from "./pages/RealTimeAlerts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/live-feed" element={<LiveFeed/>} />
      <Route path="/historylogs" element={<HistoryLogs/>} />
      <Route path="/alerts" element={<RealTimeAlerts/>} />
      
    </Routes>
  );
}
