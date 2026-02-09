import React, { useState } from "react";
import { 
  Clock, 
  Shield, 
  LogOut,
  FileText,
  Camera,
  AlertTriangle,
  Video,
  BarChart,
  Bell,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  HardDrive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryLogs = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [cameraSelection, setCameraSelection] = useState("All Cameras");
  const [severityLevel, setSeverityLevel] = useState("All Levels");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { id: "dashboard", icon: BarChart, label: "Dashboard" },
    { id: "live", icon: Camera, label: "Live Feed" },
    { id: "history", icon: FileText, label: "History Logs" },
    { id: "alerts", icon: Bell, label: "Real-Time Alerts" },
  ];

  // Incident data
  const incidents = [
    { 
      id: "INC-001284", 
      camera: "CAM 02 - Hostel Corridor", 
      timestamp: "Oct 24, 2023 - 14:20:05", 
      status: "In Progress", 
      severity: "Medium",
      type: "Unauthorized Access",
      officer: "Officer Smith",
      duration: "2m 45s"
    },
    { 
      id: "INC-001283", 
      camera: "CAM 04 - Main Gate", 
      timestamp: "Oct 24, 2023 - 14:18:30", 
      status: "Escalated", 
      severity: "High",
      type: "Suspicious Vehicle",
      officer: "Officer Johnson",
      duration: "5m 12s"
    },
    { 
      id: "INC-001282", 
      camera: "CAM 03 - Parking Area", 
      timestamp: "Oct 24, 2023 - 14:02:11", 
      status: "Resolved", 
      severity: "Low",
      type: "Parking Violation",
      officer: "Officer Davis",
      duration: "8m 30s"
    },
    { 
      id: "INC-001281", 
      camera: "CAM 01 - Main Lobby", 
      timestamp: "Oct 24, 2023 - 13:45:50", 
      status: "Resolved", 
      severity: "Medium",
      type: "Unauthorized Entry",
      officer: "Officer Wilson",
      duration: "12m 15s"
    },
    { 
      id: "INC-001280", 
      camera: "CAM 05 - West Wing", 
      timestamp: "Oct 24, 2023 - 13:12:00", 
      status: "Resolved", 
      severity: "Low",
      type: "Equipment Tampering",
      officer: "Officer Brown",
      duration: "3m 45s"
    },
    { 
      id: "INC-001279", 
      camera: "CAM 02 - Hostel Corridor", 
      timestamp: "Oct 24, 2023 - 12:45:22", 
      status: "Resolved", 
      severity: "High",
      type: "Emergency Alert",
      officer: "Officer Miller",
      duration: "15m 20s"
    },
    { 
      id: "INC-001278", 
      camera: "CAM 04 - Main Gate", 
      timestamp: "Oct 24, 2023 - 11:30:15", 
      status: "Resolved", 
      severity: "Medium",
      type: "Visitor Protocol Violation",
      officer: "Officer Taylor",
      duration: "7m 45s"
    },
    { 
      id: "INC-001277", 
      camera: "CAM 03 - Parking Area", 
      timestamp: "Oct 24, 2023 - 10:15:42", 
      status: "Resolved", 
      severity: "Low",
      type: "Parking Violation",
      officer: "Officer Anderson",
      duration: "4m 30s"
    },
    { 
      id: "INC-001276", 
      camera: "CAM 01 - Main Lobby", 
      timestamp: "Oct 24, 2023 - 09:55:10", 
      status: "Resolved", 
      severity: "Medium",
      type: "Crowd Gathering",
      officer: "Officer Thomas",
      duration: "6m 15s"
    },
    { 
      id: "INC-001275", 
      camera: "CAM 05 - West Wing", 
      timestamp: "Oct 24, 2023 - 09:30:00", 
      status: "Resolved", 
      severity: "Low",
      type: "Equipment Check",
      officer: "Officer Jackson",
      duration: "2m 00s"
    }
  ];

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(incidents.length / itemsPerPage);
  
  const getPaginatedIncidents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return incidents.slice(startIndex, endIndex);
  };

  // Get severity badge style
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle sidebar navigation
  const handleSidebarNavigation = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "dashboard") {
      navigate("/dashboard");
    } else if (tabId === "live") {
      navigate("/live-feed");
    } else if (tabId === "alerts") {
      navigate("/alerts");
    }
  };

  const handleExport = () => {
    alert('Exporting report...');
    // In a real app, this would trigger a download
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-500 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white-500">
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
        <div className="p-4 border-t border-white-500">
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
            {/* Left: Title & Stats */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">History Logs</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <span>Archive Sync: <span className="font-semibold text-green-600">Active</span></span>
                </div>
              </div>
            </div>

            {/* Right: Profile & Status */}
            <div className="flex items-center gap-6">
              {/* Profile */}
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
          
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Camera Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAMERA SELECTION
                </label>
                <select
                  value={cameraSelection}
                  onChange={(e) => setCameraSelection(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option>All Cameras</option>
                  <option>CAM 01 - Main Lobby</option>
                  <option>CAM 02 - Hostel Corridor</option>
                  <option>CAM 03 - Parking Area</option>
                  <option>CAM 04 - Main Gate</option>
                  <option>CAM 05 - West Wing</option>
                </select>
              </div>

              
              {/* Severity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEVERITY LEVEL
                </label>
                <select
                  value={severityLevel}
                  onChange={(e) => setSeverityLevel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option>All Levels</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              
              {/* Apply Filters Button - Now on the left of Severity Level */}
              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Stats Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by incident ID or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1,284</div>
                <div className="text-sm text-gray-500">TOTAL INCIDENTS</div>
              </div>
              
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Incidents Table - Simplified with only 4 columns */}
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CAMERA LOCATION</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">TIMESTAMP</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SEVERITY</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">DURATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getPaginatedIncidents().map((incident) => (
                    <tr key={incident.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Video className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{incident.camera}</div>
                            <div className="text-sm text-gray-500">ID: {incident.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{incident.timestamp.split(' - ')[0]}</div>
                        <div className="text-sm text-gray-500">{incident.timestamp.split(' - ')[1]}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityStyle(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{incident.duration}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, incidents.length)} of {incidents.length} results
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                
                {[...Array(Math.min(3, totalPages))].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                {totalPages > 3 && (
                  <>
                    <span className="text-gray-400 px-2">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryLogs;