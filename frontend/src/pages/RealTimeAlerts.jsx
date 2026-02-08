import React, { useState } from "react";
import { 
  Bell, 
  Shield, 
  LogOut,
  FileText,
  Camera,
  AlertTriangle,
  Video,
  BarChart,
  Eye,
  Download,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  Volume2,
  Play,
  Pause,
  Maximize2,
  Activity,
  Clock,
  Zap,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  HardDrive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RealTimeAlerts = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [selectedAlert, setSelectedAlert] = useState("AL-8291");
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { id: "dashboard", icon: BarChart, label: "Dashboard" },
    { id: "live", icon: Camera, label: "Live Feed" },
    { id: "history", icon: FileText, label: "History Logs" },
    { id: "alerts", icon: Bell, label: "Real-Time Alerts" },
  ];

  // Active incidents data
  const activeIncidents = [
    { 
      id: "AL-8291", 
      level: "CRITICAL", 
      title: "Physical Altercation", 
      location: "CAM 02 - Hostel Corridor", 
      confidence: "98%",
      timestamp: "14:21:44",
      status: "Active",
      zone: "Zone B",
      duration: "2m 18s",
      peopleInvolved: 3
    },
    { 
      id: "AL-8290", 
      level: "WARNING", 
      title: "Unauthorized Entry", 
      location: "CAM 04 - Main Gate", 
      confidence: "82%",
      timestamp: "14:18:30",
      status: "Active",
      zone: "Main Entrance",
      duration: "5m 32s",
      peopleInvolved: 1
    },
    { 
      id: "AL-8289", 
      level: "WARNING", 
      title: "Suspicious Baggage", 
      location: "CAM 01 - Lobby", 
      confidence: "75%",
      timestamp: "14:15:12",
      status: "Active",
      zone: "Zone A",
      duration: "8m 56s",
      peopleInvolved: 1
    },
    { 
      id: "AL-8288", 
      level: "MEDIUM", 
      title: "Crowd Gathering", 
      location: "CAM 03 - Parking Area", 
      confidence: "68%",
      timestamp: "13:45:22",
      status: "Active",
      zone: "Parking Lot",
      duration: "45m 10s",
      peopleInvolved: 8
    },
    { 
      id: "AL-8287", 
      level: "LOW", 
      title: "Parking Violation", 
      location: "CAM 05 - West Wing", 
      confidence: "92%",
      timestamp: "13:30:15",
      status: "Active",
      zone: "Service Area",
      duration: "56m 25s",
      peopleInvolved: 1
    }
  ];

  // Get selected alert details
  const selectedAlertDetails = activeIncidents.find(alert => alert.id === selectedAlert) || activeIncidents[0];

  // Get alert level style
  const getAlertLevelStyle = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'WARNING':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Get confidence badge style
  const getConfidenceStyle = (confidence) => {
    const confidenceValue = parseInt(confidence);
    if (confidenceValue >= 90) return 'bg-green-100 text-green-800';
    if (confidenceValue >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Handle sidebar navigation
  const handleSidebarNavigation = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "dashboard") {
      navigate("/dashboard");
    } else if (tabId === "live") {
      navigate("/live-feed");
    } else if (tabId === "history") {
      navigate("/history-logs");
    }
  };

  // Handle action buttons
  const handleDispatchTeam = () => {
    alert(`Dispatching team to ${selectedAlertDetails.location}`);
  };

  const handleEscalate = () => {
    alert(`Escalating incident ${selectedAlertDetails.id} to authorities`);
  };

  const handleFalsePositive = () => {
    alert(`Marking incident ${selectedAlertDetails.id} as false positive`);
  };

  const handleResolve = () => {
    alert(`Resolving incident ${selectedAlertDetails.id}`);
  };

  // Filter incidents based on level
  const filteredIncidents = filterLevel === "all" 
    ? activeIncidents 
    : activeIncidents.filter(incident => incident.level === filterLevel);

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
            {/* Left: Title & Stats */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alerts Management</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Active Incidents: <span className="font-semibold text-red-600">{activeIncidents.length}</span></span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Active Incidents List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Active Incidents</h2>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search incidents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-48"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setFilterLevel("all")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterLevel === "all" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterLevel("CRITICAL")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterLevel === "CRITICAL" 
                        ? "bg-red-600 text-white" 
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    Critical
                  </button>
                  <button
                    onClick={() => setFilterLevel("WARNING")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterLevel === "WARNING" 
                        ? "bg-orange-600 text-white" 
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                  >
                    Warning
                  </button>
                </div>

                {/* Incidents List */}
                <div className="space-y-4">
                  {filteredIncidents.map((incident) => (
                    <div 
                      key={incident.id}
                      onClick={() => setSelectedAlert(incident.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedAlert === incident.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getAlertLevelStyle(incident.level)}`}>
                          {incident.level}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getConfidenceStyle(incident.confidence)}`}>
                          {incident.confidence} Confidence
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-1">{incident.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {incident.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {incident.peopleInvolved} involved
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Incident Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
                {/* Incident Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Incident Details</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-gray-600">#{selectedAlertDetails.id}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{selectedAlertDetails.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Incident Description */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    {selectedAlertDetails.title} detected in {selectedAlertDetails.zone}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Detected: {selectedAlertDetails.duration} ago
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Confidence: {selectedAlertDetails.confidence}
                    </div>
                  </div>
                </div>

                {/* Live Incident Stream */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">LIVE INCIDENT STREAM</h3>
                  
                  {/* Video Player */}
                  <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 mb-4">
                    {/* Simulated live video feed */}
                    <div className="absolute inset-0">
                      {/* Moving grid effect */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                        linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                      
                      {/* Simulated incident highlight */}
                      <div className="absolute top-1/3 left-1/3 w-24 h-16 border-2 border-red-500 rounded animate-pulse">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          ALERT AREA
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                          {selectedAlertDetails.location}
                        </div>
                        <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Live indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-white">LIVE</span>
                    </div>
                    
                    {/* Timestamp */}
                    <div className="absolute top-3 right-3 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      2023-10-24 {selectedAlertDetails.timestamp}
                    </div>
                  </div>

                  {/* Camera Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedAlertDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedAlertDetails.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={handleDispatchTeam}
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                  >
                    <Users className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-blue-700">DISPATCH TEAM</span>
                  </button>
                  
                  <button
                    onClick={handleEscalate}
                    className="flex flex-col items-center justify-center p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors group"
                  >
                    <AlertTriangle className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-orange-700">ESCALATE AUTHORITY</span>
                  </button>
                  
                  <button
                    onClick={handleFalsePositive}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <XCircle className="w-6 h-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">FALSE POSITIVE</span>
                  </button>
                  
                  <button
                    onClick={handleResolve}
                    className="flex flex-col items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-green-700">RESOLVE & ARCHIVE</span>
                  </button>
                </div>
              </div>

              {/* Live Playback Section */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">LIVE PLAYBACK</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Additional camera feeds */}
                  <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="absolute top-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      CAM 01 - Lobby
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      14:21:44
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="absolute top-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      CAM 03 - Parking
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      14:21:44
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="absolute top-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      CAM 04 - Main Gate
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                      14:21:44
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RealTimeAlerts;