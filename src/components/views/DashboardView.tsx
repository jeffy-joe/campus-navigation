import React, { useState } from 'react';
import { 
  Search, 
  ArrowLeftRight, 
  ArrowRight, 
  BookOpen, 
  Utensils, 
  Theater, 
  Building2, 
  FlaskConical, 
  Presentation, 
  MapPin, 
  ChevronRight, 
  Compass,
  Plane,
  Dumbbell
} from 'lucide-react';
import { QUICK_CATEGORIES, getAllSearchableLocations } from '../../data/campusData';
import { CategoryType } from '../../types/campus';
import { LocationPickerModal } from '../LocationPickerModal';

interface DashboardViewProps {
  currentLocationId: string;
  destinationId: string;
  onSetCurrentLocation: (id: string) => void;
  onSetDestination: (id: string) => void;
  onSwapLocations: () => void;
  onStartNavigation: () => void;
  onCategoryClick: (category: CategoryType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLocationId,
  destinationId,
  onSetCurrentLocation,
  onSetDestination,
  onSwapLocations,
  onStartNavigation,
  onCategoryClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'current' | 'destination'>('current');
  const [pickerModalSubtitle, setPickerModalSubtitle] = useState<string | undefined>(undefined);
  const [pendingDestinationId, setPendingDestinationId] = useState<string | null>(null);
  const [isNavigatingAfterPicker, setIsNavigatingAfterPicker] = useState(false);
  const allLocations = getAllSearchableLocations();

  const handleQuickCategorySelect = (category: typeof QUICK_CATEGORIES[0]) => {
    let targetDestId = 'node-ai-lab';
    switch (category.id) {
      case 'labs':
        targetDestId = 'node-ai-lab';
        break;
      case 'aviation':
        targetDestId = 'node-flight-sim';
        break;
      case 'library':
        targetDestId = 'node-central-library-m';
        break;
      case 'canteen':
        targetDestId = 'node-cafeteria-g';
        break;
      case 'sports':
        targetDestId = 'node-pickleball';
        break;
      case 'auditorium':
        targetDestId = 'node-auditorium-1';
        break;
      default:
        targetDestId = 'node-ai-lab';
    }

    onSetDestination(targetDestId);
    setPendingDestinationId(targetDestId);
    setPickerTarget('current');
    setPickerModalSubtitle(`Navigate to ${category.name}`);
    setIsNavigatingAfterPicker(true);
    setIsPickerOpen(true);
  };

  const filteredLocations = searchQuery.trim()
    ? allLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.floorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (loc.code && loc.code.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'library': return <BookOpen className="w-5 h-5" />;
      case 'canteen': return <Utensils className="w-5 h-5" />;
      case 'auditorium': return <Theater className="w-5 h-5" />;
      case 'admin': return <Building2 className="w-5 h-5" />;
      case 'labs': return <FlaskConical className="w-5 h-5" />;
      case 'aviation': return <Plane className="w-5 h-5" />;
      case 'sports': return <Dumbbell className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const currentLocationObj = allLocations.find((loc) => loc.id === currentLocationId);
  const destinationLocationObj = allLocations.find((loc) => loc.id === destinationId);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-10 animate-in fade-in duration-200">
      {/* 1. Global Search Bar with Live Dropdown */}
      <div className="relative">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for places, buildings, labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-slate-800 placeholder:text-slate-400 text-sm font-medium pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 shadow-soft focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>

        {/* Live Search Suggestions Dropdown */}
        {filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 max-h-72 overflow-y-auto p-2">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  onSetDestination(loc.id);
                  setSearchQuery('');
                  onStartNavigation();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary-50 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 group-hover:text-primary-700 text-slate-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary-700">{loc.name}</h4>
                    <p className="text-xs text-slate-400">{loc.floorName} {loc.code ? `• ${loc.code}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Go</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Route Builder Card (Click to open 2-step Floor -> Location popup) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3 relative">
          
          {/* Current Location Interactive Trigger Card */}
          <div
            onClick={() => {
              setPickerTarget('current');
              setPickerModalSubtitle(undefined);
              setIsNavigatingAfterPicker(false);
              setIsPickerOpen(true);
            }}
            className="flex-1 w-full bg-slate-50 hover:bg-primary-50/50 hover:border-primary-200 rounded-2xl p-3.5 sm:p-4 border border-slate-100 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full ring-4 ring-primary-100 bg-primary-600"></div>
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-primary-700">
                  Current Location
                </label>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-primary-600 border border-slate-200 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                Change
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-sm font-black text-slate-900 group-hover:text-primary-700 transition-colors truncate">
                  {currentLocationObj?.name || 'Select Current Location'}
                </h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 truncate">
                  {currentLocationObj
                    ? `Floor ${currentLocationObj.floorCode} (${currentLocationObj.floorName}) ${currentLocationObj.code ? `• ${currentLocationObj.code}` : ''}`
                    : 'Tap to select starting point'}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={onSwapLocations}
            title="Swap Locations"
            className="w-10 h-10 rounded-full bg-white hover:bg-primary-50 text-slate-600 hover:text-primary-600 flex items-center justify-center border border-slate-200 shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0 z-10 my-[-6px] md:my-0"
          >
            <ArrowLeftRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </button>

          {/* Destination Interactive Trigger Card */}
          <div
            onClick={() => {
              setPickerTarget('destination');
              setPickerModalSubtitle(undefined);
              setIsNavigatingAfterPicker(false);
              setIsPickerOpen(true);
            }}
            className="flex-1 w-full bg-slate-50 hover:bg-rose-50/50 hover:border-rose-200 rounded-2xl p-3.5 sm:p-4 border border-slate-100 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full ring-4 ring-rose-100 bg-rose-600"></div>
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-rose-700">
                  Destination
                </label>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-rose-600 border border-slate-200 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                Change
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-sm font-black text-slate-900 group-hover:text-rose-700 transition-colors truncate">
                  {destinationLocationObj?.name || 'Select Destination'}
                </h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 truncate">
                  {destinationLocationObj
                    ? `Floor ${destinationLocationObj.floorCode} (${destinationLocationObj.floorName}) ${destinationLocationObj.code ? `• ${destinationLocationObj.code}` : ''}`
                    : 'Tap to select target room'}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          </div>

        </div>

        {/* Start Navigation Action Button */}
        <button
          onClick={onStartNavigation}
          className="w-full py-3.5 sm:py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-primary-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Start Navigation</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Quick Access Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Quick Access</h3>
          <button 
            onClick={() => onCategoryClick('labs')}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleQuickCategorySelect(cat)}
              className="group bg-white hover:bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-soft flex flex-col items-center justify-center gap-2 sm:gap-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg text-center active:scale-95"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${cat.bgLight} flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                {getCategoryIcon(cat.id)}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-slate-900 line-clamp-1">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Step Location Selection Modal (Floor -> Room) */}
      <LocationPickerModal
        isOpen={isPickerOpen}
        title={
          pickerTarget === 'destination'
            ? 'Select Destination'
            : isNavigatingAfterPicker
            ? 'Where are you right now?'
            : 'Select Current Location'
        }
        subtitle={pickerModalSubtitle}
        isDestination={pickerTarget === 'destination'}
        selectedLocationId={pickerTarget === 'destination' ? destinationId : currentLocationId}
        onSelectLocation={(locId) => {
          if (pickerTarget === 'destination') {
            onSetDestination(locId);
          } else {
            onSetCurrentLocation(locId);
            if (isNavigatingAfterPicker) {
              if (pendingDestinationId) {
                onSetDestination(pendingDestinationId);
              }
              setIsNavigatingAfterPicker(false);
              onStartNavigation();
            }
          }
        }}
        onClose={() => {
          setIsPickerOpen(false);
          setIsNavigatingAfterPicker(false);
          setPickerModalSubtitle(undefined);
        }}
      />
    </div>
  );
};
