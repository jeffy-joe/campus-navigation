import React, { useState } from 'react';
import { FloorSvgMap } from '../map/FloorSvgMap';
import { MapControls } from '../map/MapControls';
import { FloorPickerModal } from '../map/FloorPickerModal';
import { Room } from '../../types/campus';
import { CAMPUS_FLOORS } from '../../data/campusData';
import { ChevronDown, Layers } from 'lucide-react';

interface CampusMapViewProps {
  selectedFloorCode: string;
  onSelectFloorCode: (floorCode: string) => void;
  onRoomClick: (room: Room) => void;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  selectedFloorCode,
  onSelectFloorCode,
  onRoomClick,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFloorPickerOpen, setIsFloorPickerOpen] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.7));
  const handleReset = () => setZoomLevel(1);

  const activeFloorObj = CAMPUS_FLOORS.find((f) => f.code === selectedFloorCode) || CAMPUS_FLOORS[7];

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-28 lg:pb-10 animate-in fade-in">
      {/* Top Map Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-100 shadow-soft">
        <div className="flex items-center gap-2.5">
          {/* Popup trigger button replacing old native select dropdown */}
          <button
            onClick={() => setIsFloorPickerOpen(true)}
            className="flex items-center gap-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md shadow-primary-600/20 transition-all hover:shadow-lg hover:shadow-primary-600/30 active:scale-95 group"
            title="Click to open Floor selection popup window"
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <span>Floor {activeFloorObj.code} • {activeFloorObj.title}</span>
            <ChevronDown className="w-4 h-4 opacity-80 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium truncate max-w-sm hidden sm:inline">
          {activeFloorObj.subtitle}
        </span>
      </div>

      {/* Main Interactive Map Canvas Box */}
      <div className="relative bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden min-h-[380px] sm:min-h-[500px] flex items-center justify-center p-2 sm:p-4">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out overflow-auto"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <FloorSvgMap
            floorCode={selectedFloorCode}
            onRoomClick={onRoomClick}
            showRoute={false}
          />
        </div>

        {/* Floating Map Controls on the Right */}
        <div className="absolute right-3 sm:right-6 bottom-3 sm:bottom-6 z-10">
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Floor Picker Popup Window */}
      <FloorPickerModal
        isOpen={isFloorPickerOpen}
        selectedFloorCode={selectedFloorCode}
        onSelectFloorCode={onSelectFloorCode}
        onClose={() => setIsFloorPickerOpen(false)}
      />
    </div>
  );
};
