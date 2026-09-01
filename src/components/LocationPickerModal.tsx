import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  Search, 
  Check, 
  Compass
} from 'lucide-react';
import { CAMPUS_FLOORS } from '../data/campusData';
import { Floor } from '../types/campus';

interface LocationPickerModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  isDestination?: boolean;
  selectedLocationId: string;
  onSelectLocation: (locationId: string) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  title = 'Select Current Location',
  subtitle,
  isDestination = false,
  selectedLocationId,
  onSelectLocation,
  onClose,
}) => {
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedFloor(null);
      setSearchFilter('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Destination mode: flat list of ALL rooms across all floors ──────────
  if (isDestination) {
    const allRooms = CAMPUS_FLOORS.flatMap((floor) =>
      floor.rooms.map((room) => ({ ...room, floorCode: floor.code, floorTitle: floor.title, floorBg: floor.bgColor, floorText: floor.textColor }))
    );
    const filteredRooms = allRooms.filter((room) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        room.name.toLowerCase().includes(q) ||
        room.code.toLowerCase().includes(q) ||
        room.description.toLowerCase().includes(q) ||
        room.floorTitle.toLowerCase().includes(q) ||
        room.floorCode.toLowerCase().includes(q)
      );
    });

    return (
      <div onClick={onClose} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 w-full sm:max-w-lg overflow-hidden flex flex-col h-[85vh] sm:h-[620px] max-h-[92vh] sm:max-h-[90vh]">
          {/* Header */}
          <div className="p-5 text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 inline-block mb-1">
                    Select Destination
                  </span>
                  <h3 className="text-lg font-black tracking-tight leading-tight">{title}</h3>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 relative">
              <Search className="w-4 h-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search any room, lab, department..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                autoFocus
                className="w-full bg-white/15 focus:bg-white text-white focus:text-slate-800 placeholder:text-white/70 focus:placeholder:text-slate-400 text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-white/20 focus:border-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Flat room list */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 block pb-1">
              {filteredRooms.length} Location{filteredRooms.length !== 1 ? 's' : ''} Found
            </span>
            {filteredRooms.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">No locations matched your search.</p>
              </div>
            ) : (
              filteredRooms.map((room) => {
                const isSelected = selectedLocationId === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => { onSelectLocation(room.id); onClose(); }}
                    className={`w-full rounded-2xl p-3.5 border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-rose-200 shadow-sm'
                    }`}
                  >
                    {/* Floor badge */}
                    <div className={`w-10 h-10 rounded-xl ${room.floorBg} flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-black ${room.floorText}`}>{room.floorCode}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{room.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{room.floorTitle} {room.code ? `• ${room.code}` : ''}</p>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 px-5">
            <span>All campus locations</span>
            <span>15 Floors</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Current Location mode: 2-step Floor -> Room ──────────────────────────
  const filteredFloors = CAMPUS_FLOORS.filter((floor) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      floor.name.toLowerCase().includes(q) ||
      floor.title.toLowerCase().includes(q) ||
      floor.subtitle.toLowerCase().includes(q) ||
      floor.code.toLowerCase().includes(q) ||
      floor.rooms.some((r) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q))
    );
  });

  const filteredRoomsOnFloor = selectedFloor
    ? selectedFloor.rooms.filter((room) => {
        if (!searchFilter.trim()) return true;
        const q = searchFilter.toLowerCase();
        return (
          room.name.toLowerCase().includes(q) ||
          room.code.toLowerCase().includes(q) ||
          room.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 w-full sm:max-w-lg overflow-hidden flex flex-col h-[85vh] sm:h-[620px] max-h-[92vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="p-5 text-white bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedFloor ? (
                <button
                  onClick={() => { setSelectedFloor(null); setSearchFilter(''); }}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 inline-block mb-1">
                  {selectedFloor ? 'Step 2 of 2: Select Location' : subtitle || 'Step 1 of 2: Select Floor'}
                </span>
                <h3 className="text-lg font-black tracking-tight leading-tight">
                  {selectedFloor ? `Floor ${selectedFloor.code} Locations` : title}
                </h3>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 relative">
            <Search className="w-4 h-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={selectedFloor ? `Search rooms on Floor ${selectedFloor.code}...` : 'Search floor, department, or lab...'}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-white/15 focus:bg-white text-white focus:text-slate-800 placeholder:text-white/70 focus:placeholder:text-slate-400 text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-white/20 focus:border-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-2">
          {/* STEP 1: Floors */}
          {!selectedFloor && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 block pb-1">
                Select Your Floor ({filteredFloors.length} Levels)
              </span>
              {filteredFloors.map((floor) => (
                <div
                  key={floor.id}
                  onClick={() => { setSelectedFloor(floor); setSearchFilter(''); }}
                  className="w-full bg-white hover:bg-slate-50 rounded-2xl p-3.5 border border-slate-100 hover:border-primary-200 shadow-sm hover:shadow-md flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl ${floor.bgColor} flex items-center justify-center border border-slate-100 shrink-0 group-hover:scale-105 transition-transform`}>
                      <span className={`text-base font-black ${floor.textColor}`}>{floor.code}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors flex items-center gap-2">
                        {floor.title}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          {floor.rooms.length} {floor.rooms.length === 1 ? 'room' : 'places'}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">{floor.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Rooms on chosen floor */}
          {selectedFloor && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 block pb-1">
                Which location are you at on Floor {selectedFloor.code}?
              </span>
              {filteredRoomsOnFloor.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm">No locations matched your search.</p>
                </div>
              ) : (
                filteredRoomsOnFloor.map((room) => {
                  const isSelected = selectedLocationId === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => { onSelectLocation(room.id); onClose(); }}
                      className={`w-full rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-primary-50/80 border-primary-300 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-primary-200 shadow-sm'
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-primary-600 uppercase tracking-wider bg-primary-100/60 px-2 py-0.5 rounded-lg">
                            {room.code}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">• {room.category}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{room.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{room.description}</p>
                      </div>
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-sm shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 px-5">
          {selectedFloor ? (
            <button
              onClick={() => setSelectedFloor(null)}
              className="text-primary-600 hover:underline font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Choose different floor</span>
            </button>
          ) : (
            <span>Tap any floor to see its rooms & labs</span>
          )}
          <span>15 Campus Levels</span>
        </div>
      </div>
    </div>
  );
};
