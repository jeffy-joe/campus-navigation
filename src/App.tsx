import React, { useState, useMemo } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/views/DashboardView';
import { NavigateView } from './components/views/NavigateView';
import { ExploreFloorsView } from './components/views/ExploreFloorsView';
import { CampusMapView } from './components/views/CampusMapView';
import { RoomModal } from './components/map/RoomModal';
import { getAllSearchableLocations } from './data/campusData';
import { findShortestPath } from './utils/pathfinder';
import { CategoryType, Room } from './types/campus';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Initial navigation state (empty by default)
  const [currentLocationId, setCurrentLocationId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [selectedFloorCode, setSelectedFloorCode] = useState('4');
  const [activeModalRoom, setActiveModalRoom] = useState<Room | null>(null);
  const [showRouteOverview, setShowRouteOverview] = useState(false);

  const allLocations = useMemo(() => getAllSearchableLocations(), []);

  // Compute Dijkstra Shortest Path across floors
  const navResult = useMemo(() => {
    return findShortestPath(currentLocationId, destinationId);
  }, [currentLocationId, destinationId]);

  const handleSwapLocations = () => {
    const temp = currentLocationId;
    setCurrentLocationId(destinationId);
    setDestinationId(temp);
    setShowRouteOverview(false);
  };

  const handleStartNavigation = () => {
    // If destination is on a specific floor, pre-select that floor on the map
    const destLoc = allLocations.find((l) => l.id === destinationId);
    if (destLoc) {
      setSelectedFloorCode(destLoc.floorCode);
    }
    setShowRouteOverview(true);
    setActiveTab('navigate');
  };

  const handleCategoryClick = (_cat: CategoryType) => {
    setActiveTab('explore');
  };

  const handleNavigateToRoom = (roomId: string) => {
    setDestinationId(roomId);
    const loc = allLocations.find((l) => l.id === roomId);
    if (loc) {
      setSelectedFloorCode(loc.floorCode);
    }
    setShowRouteOverview(true);
    setActiveTab('navigate');
  };

  const handleSetAsStart = (roomId: string) => {
    setCurrentLocationId(roomId);
    setShowRouteOverview(false);
  };

  const handleViewFloorOnMap = (floorCode: string) => {
    setSelectedFloorCode(floorCode);
    setActiveTab('map');
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'navigate': return 'Navigate';
      case 'explore': return 'Explore Floors';
      case 'map': return 'Campus Map';
      default: return 'Campus Navigator';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={getHeaderTitle()}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              currentLocationId={currentLocationId}
              destinationId={destinationId}
              onSetCurrentLocation={setCurrentLocationId}
              onSetDestination={setDestinationId}
              onSwapLocations={handleSwapLocations}
              onStartNavigation={handleStartNavigation}
              onCategoryClick={handleCategoryClick}
            />
          )}

          {activeTab === 'navigate' && (
            <NavigateView
              currentLocationId={currentLocationId}
              destinationId={destinationId}
              allLocations={allLocations}
              onSetCurrentLocation={setCurrentLocationId}
              onSetDestination={setDestinationId}
              navResult={navResult}
              autoStartNav={showRouteOverview}
              onDirectionsRequested={() => setShowRouteOverview(true)}
              onOpenMap={() => {
                if (navResult?.destinationNode.floorCode) {
                  setSelectedFloorCode(navResult.destinationNode.floorCode);
                }
                setActiveTab('map');
              }}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreFloorsView
              onSelectRoom={setActiveModalRoom}
              onNavigateToRoom={handleNavigateToRoom}
              onViewFloorOnMap={handleViewFloorOnMap}
            />
          )}

          {activeTab === 'map' && (
            <CampusMapView
              selectedFloorCode={selectedFloorCode}
              onSelectFloorCode={setSelectedFloorCode}
              onRoomClick={setActiveModalRoom}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Clicked Room Details Modal */}
      <RoomModal
        room={activeModalRoom}
        onClose={() => setActiveModalRoom(null)}
        onNavigateHere={handleNavigateToRoom}
        onSetAsStart={handleSetAsStart}
      />
    </div>
  );
}
export default App;
