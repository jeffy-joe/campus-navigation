import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Volume2,
  VolumeX,
  CheckCircle2,
  Compass,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Layers
} from 'lucide-react';
import { NavigationResult } from '../../types/campus';
import { CAMPUS_FLOORS } from '../../data/campusData';
import { FloorSvgMap } from '../map/FloorSvgMap';
import { LocationPickerModal } from '../LocationPickerModal';
import confetti from 'canvas-confetti';

interface NavigateViewProps {
  currentLocationId: string;
  destinationId: string;
  allLocations: { id: string; name: string; floorNumber: number; floorCode: string; floorName: string; code?: string }[];
  onSetCurrentLocation: (id: string) => void;
  onSetDestination: (id: string) => void;
  navResult: NavigationResult | null;
  onRecalculate?: () => void;
  onOpenMap: () => void;
  autoStartNav?: boolean;
  onDirectionsRequested?: () => void;
}

export const NavigateView: React.FC<NavigateViewProps> = ({
  currentLocationId,
  destinationId,
  allLocations,
  onSetCurrentLocation,
  onSetDestination,
  navResult,
  onRecalculate,
  autoStartNav = false,
  onDirectionsRequested,
}) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'current' | 'destination'>('current');
  const [mapFloorCode, setMapFloorCode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showRoute, setShowRoute] = useState(true);
  const [hasRequestedDirections, setHasRequestedDirections] = useState(autoStartNav);

  React.useEffect(() => {
    if (autoStartNav) {
      setHasRequestedDirections(true);
      setActiveStepIndex(0);
    }
  }, [autoStartNav]);

  const triggerVoice = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (next && navResult?.steps[0]) triggerVoice(navResult.steps[0].instruction);
  };

  const handleNext = () => {
    if (!navResult) return;
    if (activeStepIndex < navResult.steps.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      triggerVoice(navResult.steps[nextIdx].instruction);

      // Update the map floor to the floor of the current step
      const stepFloor = navResult.steps[nextIdx].floorCode;
      if (stepFloor) setMapFloorCode(stepFloor);

      if (nextIdx === navResult.steps.length - 1) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      const prevIdx = activeStepIndex - 1;
      setActiveStepIndex(prevIdx);
      triggerVoice(navResult!.steps[prevIdx].instruction);
      const stepFloor = navResult!.steps[prevIdx].floorCode;
      if (stepFloor) setMapFloorCode(stepFloor);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setMapFloorCode(null);
  };

  const currentLocationObj = allLocations.find((loc) => loc.id === currentLocationId);
  const destinationLocationObj = allLocations.find((loc) => loc.id === destinationId);
  const activeStep = navResult?.steps[activeStepIndex];

  // Show the map of the floor where the user wants to go (destination floor)
  const displayFloor = destinationLocationObj?.floorCode || currentLocationObj?.floorCode || '4';

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-28 lg:pb-10 animate-in fade-in">

      {/* ── Location Selector Card & Get Directions Button ── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Current Location */}
          <div
            onClick={() => { setPickerTarget('current'); setIsPickerOpen(true); }}
            className="flex-1 bg-slate-50 hover:bg-primary-50/50 hover:border-primary-200 rounded-2xl p-3.5 border border-slate-100 transition-all cursor-pointer group shadow-sm flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white text-primary-600 border border-slate-200 group-hover:border-primary-300 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">From</span>
                <h4 className="text-sm font-black text-slate-900 group-hover:text-primary-700 truncate">
                  {currentLocationObj?.name || 'Select start'}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentLocationObj ? `Floor ${currentLocationObj.floorCode}` : 'Tap to select'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-primary-600 border border-slate-200 group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">Change</span>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </div>

          {/* Destination */}
          <div
            onClick={() => { setPickerTarget('destination'); setIsPickerOpen(true); }}
            className="flex-1 bg-slate-50 hover:bg-rose-50/50 hover:border-rose-200 rounded-2xl p-3.5 border border-slate-100 transition-all cursor-pointer group shadow-sm flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 border border-slate-200 group-hover:border-rose-300 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">To</span>
                <h4 className="text-sm font-black text-slate-900 group-hover:text-rose-700 truncate">
                  {destinationLocationObj?.name || 'Select destination'}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {destinationLocationObj ? `Floor ${destinationLocationObj.floorCode}` : 'Tap to select'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-rose-600 border border-slate-200 group-hover:bg-rose-600 group-hover:text-white transition-colors shrink-0">Change</span>
          </div>
        </div>

        {/* Get Directions Button (disappears once clicked) */}
        {!hasRequestedDirections && (
          <button
            onClick={() => {
              setHasRequestedDirections(true);
              setActiveStepIndex(0);
              onDirectionsRequested?.();
            }}
            className="w-full py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Destination Floor Map & Directions (Only visible AFTER clicking Get Directions) ── */}
      {hasRequestedDirections && (
        <>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden animate-in fade-in">
        {/* Map Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-bold text-slate-800">
              Destination Floor {displayFloor} Map
            </span>
          </div>

          {/* Map Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowRoute(!showRoute)}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors ${showRoute ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}
            >
              Route {showRoute ? 'On' : 'Off'}
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.5))}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="relative min-h-[360px] flex items-center justify-center bg-slate-50/50 overflow-hidden p-2">
          <div
            className="w-full transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <FloorSvgMap
              floorCode={displayFloor}
              onRoomClick={() => {}}
              destinationRoomId={destinationId}
              startRoomId={currentLocationId}
              highlightedRoomId={destinationId}
              showRoute={showRoute}
            />
          </div>
        </div>
      </div>

      {/* ── Turn-by-Turn Step Panel ── */}
      {navResult && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Turn-by-Turn Directions</h3>
              <p className="text-xs text-slate-400 mt-0.5">{navResult.steps.length} steps</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoice}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  voiceEnabled
                    ? 'bg-primary-50 text-primary-700 border-primary-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Active Step Hero */}
          <div className={`px-5 py-4 ${activeStep?.isDestination ? 'bg-purple-50' : 'bg-primary-50/60'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                activeStep?.isDestination ? 'bg-purple-600 text-white' : 'bg-primary-600 text-white'
              }`}>
                {activeStep?.isDestination ? <MapPin className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                  Current Step
                </p>
                <h4 className={`text-base font-black ${activeStep?.isDestination ? 'text-purple-800' : 'text-slate-900'}`}>
                  {activeStep?.instruction || 'Tap Get Directions to start'}
                </h4>
                {activeStep?.subText && (
                  <p className="text-xs text-slate-500 font-medium mt-1">{activeStep.subText}</p>
                )}
                {activeStep && activeStep.distanceMeters > 0 && (
                  <p className="text-xs font-semibold text-slate-400 mt-1">{activeStep.distanceMeters} m ahead</p>
                )}
              </div>
            </div>
          </div>

          {/* Steps List (scrollable) */}
          <div className="max-h-52 overflow-y-auto divide-y divide-slate-100">
            {navResult.steps.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    triggerVoice(step.instruction);
                    if (step.floorCode) setMapFloorCode(step.floorCode);
                  }}
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                    isCurrent ? 'bg-primary-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    step.isDestination
                      ? 'bg-purple-600 text-white'
                      : isCurrent
                      ? 'bg-primary-600 text-white'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {step.isDestination ? (
                      <MapPin className="w-2.5 h-2.5" />
                    ) : isPassed ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <span className="text-[9px] font-black">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isCurrent ? 'text-primary-700' : 'text-slate-700'}`}>
                      {step.instruction}
                    </p>
                    {step.subText && (
                      <p className="text-[11px] text-slate-400 truncate">{step.subText}</p>
                    )}
                  </div>
                  {step.distanceMeters > 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold shrink-0">{step.distanceMeters}m</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-white">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-bold text-xs transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <span className="text-xs text-slate-400 font-semibold">
              {activeStepIndex + 1} / {navResult.steps.length}
            </span>

            <button
              onClick={handleNext}
              disabled={activeStepIndex >= navResult.steps.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-30 text-white font-bold text-xs shadow-sm shadow-primary-600/20 transition-all"
            >
              <span>{activeStepIndex >= navResult.steps.length - 1 ? 'Arrived!' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      </>
      )}

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isPickerOpen}
        title={pickerTarget === 'destination' ? 'Select Destination' : 'Select Current Location'}
        isDestination={pickerTarget === 'destination'}
        selectedLocationId={pickerTarget === 'destination' ? destinationId : currentLocationId}
        onSelectLocation={(locId) => {
          if (pickerTarget === 'destination') {
            onSetDestination(locId);
          } else {
            onSetCurrentLocation(locId);
          }
          setHasRequestedDirections(false);
          setActiveStepIndex(0);
          setMapFloorCode(null);
        }}
        onClose={() => setIsPickerOpen(false)}
      />
    </div>
  );
};
