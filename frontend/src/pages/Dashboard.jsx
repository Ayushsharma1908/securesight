import React, { useState } from "react";
import { 
  Bell, 
  Clock, 
  Video, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Filter,
  Download,
  Settings,
  User,
  BarChart,
  Shield,
  LogOut,
  Camera,
  Activity,
  Zap,
  ArrowRight,
  Search,
  Eye,
  MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CameraCard = ({ name, alert, alertType }) => {
  return (
    <div className={`border rounded-xl p-4 transition-all duration-200 ${alert ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
        </div>
        <div className={`w-3 h-3 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
      </div>
      
      {/* Camera Preview */}
      <div className={`h-32 rounded-lg mb-3 relative overflow-hidden ${alert ? 'bg-gradient-to-br from-red-100 to-red-200' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
        {/* Simulated camera grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px),
                          linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {alert && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm animate-pulse flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {alertType}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium px-2 py-1 rounded ${alert ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {alert ? 'ALERT' : 'ACTIVE'}
        </span>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          More Details
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const AlertCard = ({ level, title, location, time, color }) => {
  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${color === 'red' ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${color === 'red' ? 'bg-red-200 text-red-700' : 'bg-orange-200 text-orange-700'}`}>
          {level}
        </span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
      <p className="text-xs text-gray-600 mt-1">{location}</p>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Sidebar navigation items
  const navItems = [
    { id: "dashboard", icon: BarChart, label: "Dashboard" },
    { id: "live", icon: Camera, label: "Live Feed" },
    { id: "history", icon: FileText, label: "History Logs" },
    { id: "alerts", icon: Bell, label: "Real-Time Alerts" },
  ];

  // Camera data
  const cameras = [
    { id: 1, name: "CAM01-LOBBY", alert: false },
    { id: 2, name: "CAM02-CORRIDOR", alert: true, alertType: "FIGHT DETECTED" },
    { id: 3, name: "CAM03-PARKING",  alert: false },
    { id: 4, name: "CAM04-GATE",  alert: false },
  ];

  // Alerts data
  const alerts = [
    { level: "CRITICAL", title: "Physical Altercation", location: "CAM 02 - Hostel Corridor", time: "14:28:05", color: "red" },
    { level: "WARNING", title: "Unauthorized Entry", location: "CAM 04 - Main Gate", time: "14:18:36", color: "orange" },
  ];

  // AI Recommendations
  const recommendations = [
    { text: "Increase patrol in Zone B", subtext: "Crowd pattern analysis" },
    { text: "Inspect Cam 03", subtext: "Connectivity dropping" },
  ];

  // Incident History - Expanded data
  const incidents = [
    { id: 1, camera: "CAM 02 - Hostel Corridor", time: "Oct 24, 14:20:05", status: "In Progress", statusColor: "orange", type: "Physical Altercation", severity: "Critical" },
    { id: 2, camera: "CAM 04 - Main Gate", time: "Oct 24, 14:18:30", status: "Verifying", statusColor: "blue", type: "Unauthorized Entry", severity: "Warning" },
    { id: 3, camera: "CAM 03 - Parking Area", time: "Oct 24, 14:02:11", status: "Resolved", statusColor: "green", type: "Suspicious Activity", severity: "Medium" },
    { id: 4, camera: "CAM 01 - Main Lobby", time: "Oct 24, 13:45:22", status: "Resolved", statusColor: "green", type: "Crowd Gathering", severity: "Low" },
  ];

  // Filter incidents based on search and status
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchQuery === "" || 
      incident.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      incident.status.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Handle sidebar navigation
  const handleSidebarNavigation = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "live") {
      navigate("/live-feed");
    } else if (tabId === "history") {
      navigate("/historylogs");
    } else if (tabId === "alerts") {
      navigate("/alerts");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-500 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SecureSight</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSidebarNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left: Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">Security Control Center</h1>
            </div>

            {/* Right: Profile & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Security Official</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-semibold">ACTIVE DUTY</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  SO
                </div>
              </div>
              
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Live Monitoring Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">LIVE MONITORING GRID</h2>
                  <div 
                    className="flex items-center gap-2 text-sm text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => navigate("/live-feed")}
                  >
                    <Eye className="w-4 h-4" />
                    <span>See more feed</span>
                  </div>
                </div>

                {/* Camera Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {cameras.map((camera) => (
                    <CameraCard key={camera.id} {...camera} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Real-Time Alerts */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Real-Time Alerts</h2>
                  <Bell className="w-5 h-5 text-gray-500" />
                </div>
                
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <AlertCard key={index} {...alert} />
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow border border-blue-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{rec.text}</h4>
                          <p className="text-xs text-gray-500 mt-1">{rec.subtext}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Incident History Log - Full Width Section */}
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Incident History Log</h2>
                  <p className="text-sm text-gray-500 mt-1">Complete incident tracking and management</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter by camera or status..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-full sm:w-64"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* History Table - Full Width */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">CAMERA SOURCE</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">INCIDENT TYPE</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">SEVERITY</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredIncidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Video className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{incident.camera}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{incident.type}</span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            incident.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                            incident.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                            incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {incident.severity}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{incident.time}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{filteredIncidents.length}</span> of <span className="font-semibold text-gray-700">{incidents.length}</span> incidents
                </div>
                
                <button 
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  onClick={() => navigate("/history-logs")}
                >
                  <Eye className="w-4 h-4" />
                  View Full Logs
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;