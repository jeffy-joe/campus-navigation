import React, { useState, useMemo } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/views/DashboardView';
import { NavigateView } from './components/views/NavigateView';
import { ExploreFloorsView } from './components/views/ExploreFloorsView';
import { CampusMapView } from './components/views/CampusMapView';
import { RoomModal } from './components/map/RoomModal';
import { LocationPickerModal } from './components/LocationPickerModal';
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

  // State for asking current location modal when navigating from Explore Floors / RoomModal
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [pendingDestinationId, setPendingDestinationId] = useState<string | null>(null);

  const allLocations = useMemo(() => getAllSearchableLocations(), []);

  const pendingDestinationObj = useMemo(() => {
    if (!pendingDestinationId) return null;
    return allLocations.find((l) => l.id === pendingDestinationId);
  }, [pendingDestinationId, allLocations]);

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
    setPendingDestinationId(roomId);
    const loc = allLocations.find((l) => l.id === roomId);
    if (loc) {
      setSelectedFloorCode(loc.floorCode);
    }
    // Always ask for current location when navigating to a room/floor from Explore Floors
    setIsLocationPickerOpen(true);
  };

  const handleSelectStartLocationForNav = (startId: string) => {
    setCurrentLocationId(startId);
    if (pendingDestinationId) {
      setDestinationId(pendingDestinationId);
      const loc = allLocations.find((l) => l.id === pendingDestinationId);
      if (loc) {
        setSelectedFloorCode(loc.floorCode);
      }
    }
    setShowRouteOverview(true);
    setActiveTab('navigate');
    setIsLocationPickerOpen(false);
    setPendingDestinationId(null);
  };

  const handleCloseLocationPicker = () => {
    setIsLocationPickerOpen(false);
    setPendingDestinationId(null);
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

      {/* Location Picker Modal when navigating to a room/floor from Explore Floors */}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        title="Where are you right now?"
        subtitle={
          pendingDestinationObj
            ? `Navigate to ${pendingDestinationObj.name} (Floor ${pendingDestinationObj.floorCode})`
            : undefined
        }
        isDestination={false}
        selectedLocationId={currentLocationId}
        onSelectLocation={handleSelectStartLocationForNav}
        onClose={handleCloseLocationPicker}
      />
    </div>
  );
}
export default App;
