import React, { useState } from "react";
import { 
  Camera, 
  Clock, 
  Shield, 
  LogOut,
  Settings,
  User,
  Video,
  Grid3x3,
  Wifi,
  Archive,
  FolderOpen,
  Filter,
  Eye,
  AlertTriangle,
  Maximize2,
  Volume2,
  RefreshCw,
  Radio,
  Mic
} from "lucide-react";

const LiveCameraCard = ({ name, status, latency, isFocused }) => {
  const statusColors = {
    active: "green",
    warning: "orange",
    offline: "gray"
  };

  return (
    <div className={`border rounded-xl p-4 transition-all duration-200 ${isFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full bg-${statusColors[status]}-500`}></div>
            <span className={`text-xs font-medium text-${statusColors[status]}-600`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
        
      </div>
      
      {/* Camera Feed */}
      <div className="h-48 rounded-lg mb-3 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Simulated live feed */}
        <div className="absolute inset-0">
          {/* Moving grid effect for live feed */}
          <div className="absolute inset-0 opacity-10 animate-pulse" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                            linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Simulated moving objects */}{/*this is only when we find objects moving*/}
          {/* <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-50"></div> */}
          {/* <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-50"></div> */}
        </div>
        
        {/* Camera controls overlay */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70">
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
        
        {/* Time overlay */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          LIVE
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          Focus
        </button>
        <button className="text-xs font-medium text-gray-600 hover:text-gray-800 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>
    </div>
  );
};

const LiveFeed = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [sessionTime, setSessionTime] = useState("02:45:12");

  // Navigation items
  const navItems = [
    { id: "dashboard", icon: Video, label: "Dashboard" },
    { id: "live", icon: Camera, label: "Live Feed" },
    { id: "history", icon: Clock, label: "History Logs" },
    { id: "alerts", icon: AlertTriangle, label: "Real-Time Alerts" },
  ];

  // Handle sidebar navigation
  const handleSidebarNavigation = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "dashboard") {
      navigate("/dashboard");
    }
    // For other tabs, you would navigate to their respective pages
  };

  // All cameras data
  const allCameras = [
    { id: 1, name: "CAM01 - LOBBY", status: "active", latency: "12" },
    { id: 2, name: "CAM02 - CORRIDOR", status: "active", latency: "15" },
    { id: 3, name: "CAM03 - PARKING", status: "active", latency: "18" },
    { id: 4, name: "CAM04 - MAIN GATE", status: "active", latency: "10" },
    { id: 5, name: "CAM05 - SERVER ROOM", status: "warning", latency: "25" },
    { id: 6, name: "CAM06 - PERIMETER WEST", status: "active", latency: "14" },
    { id: 7, name: "CAM07 - LOADING DOCK", status: "active", latency: "16" },
    { id: 8, name: "CAM08 - OFFICE AREA", status: "active", latency: "13" },
    { id: 9, name: "CAM09 - ROOFTOP", status: "offline", latency: "0" },
  ];

  // Group cameras into rows for grid display
  const cameraRows = [
    allCameras.slice(0, 3), // First row: CAM01, CAM02, CAM03
    allCameras.slice(3, 6), // Second row: CAM04, CAM05, CAM06
    allCameras.slice(6, 9), // Third row: CAM07, CAM08, CAM09
  ];

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
                onClick={() => setActiveTab(item.id)}
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
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
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
              <h1 className="text-xl font-bold text-gray-900">Live Surveillance</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Grid3x3 className="w-4 h-4" />
                  <span>Grid View: 3×3 Active</span>
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
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  ALL CAMERAS • {allCameras.filter(cam => cam.status === 'active').length} ACTIVE NODES
                </h2>
                <p className="text-sm text-gray-500 mt-1">Live monitoring of all security cameras</p>
              </div>
              
              
            </div>
          </div>

          {/* Camera Grid - 3x3 Layout */}
          <div className="space-y-6">
            {cameraRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {row.map((camera) => (
                  <LiveCameraCard 
                    key={camera.id}
                    {...camera}
                    isFocused={selectedCamera === camera.id}
                    onFocus={() => setSelectedCamera(camera.id)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Status Summary */}
          <div className="mt-8 bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Indicators */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Camera Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Active</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {allCameras.filter(cam => cam.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Warning</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {allCameras.filter(cam => cam.status === 'warning').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Offline</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {allCameras.filter(cam => cam.status === 'offline').length}
                    </span>
                  </div>
                </div>
              </div>

              
              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Refresh All Feeds
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveFeed;