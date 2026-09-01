import React, { useState, useEffect } from 'react';
import { X, Search, Check, Layers, Sparkles } from 'lucide-react';
import { CAMPUS_FLOORS } from '../../data/campusData';
import { Floor } from '../../types/campus';

interface FloorPickerModalProps {
  isOpen: boolean;
  selectedFloorCode: string;
  onSelectFloorCode: (floorCode: string) => void;
  onClose: () => void;
}

export const FloorPickerModal: React.FC<FloorPickerModalProps> = ({
  isOpen,
  selectedFloorCode,
  onSelectFloorCode,
  onClose,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSearchFilter('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFloors = CAMPUS_FLOORS.filter((floor) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      floor.code.toLowerCase().includes(q) ||
      floor.title.toLowerCase().includes(q) ||
      floor.subtitle.toLowerCase().includes(q) ||
      floor.name.toLowerCase().includes(q) ||
      floor.categorySummary.some((cat) => cat.toLowerCase().includes(q)) ||
      floor.rooms.some((r) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 w-full sm:max-w-lg overflow-hidden flex flex-col h-[85vh] sm:h-[620px] max-h-[92vh] sm:max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 text-white bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 inline-block mb-1">
                  15 Campus Levels
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                  Select Floor Blueprint
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar inside Modal */}
          <div className="mt-3.5 relative">
            <Search className="w-4 h-4 text-white/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search floor, lab, department, or level..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              autoFocus
              className="w-full bg-white/15 focus:bg-white text-white focus:text-slate-800 placeholder:text-white/70 focus:placeholder:text-slate-400 text-xs sm:text-sm font-semibold pl-10 pr-3 py-2.5 rounded-xl border border-white/20 focus:border-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Floor List */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-2.5">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filteredFloors.length} Floor{filteredFloors.length !== 1 ? 's' : ''} Available
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Tap to view blueprint</span>
          </div>

          {filteredFloors.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm font-semibold">No floors match your search.</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for a floor number or department.</p>
            </div>
          ) : (
            filteredFloors.map((floor: Floor) => {
              const isSelected = selectedFloorCode === floor.code;
              return (
                <button
                  key={floor.id}
                  onClick={() => {
                    onSelectFloorCode(floor.code);
                    onClose();
                  }}
                  className={`w-full rounded-2xl p-3.5 border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.99] ${
                    isSelected
                      ? 'bg-primary-50/80 border-primary-300 shadow-sm ring-2 ring-primary-100'
                      : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-primary-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Floor code badge */}
                    <div
                      className={`w-11 h-11 rounded-2xl ${floor.bgColor} flex items-center justify-center border border-slate-100 shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <span className={`text-base font-black ${floor.textColor}`}>
                        {floor.code}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                          {floor.title}
                        </h4>
                        {(floor.code === '4' || floor.code === '7') && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-[10px] flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Interactive Map</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        {floor.subtitle}
                      </p>
                      
                      {/* Facilities Preview */}
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {floor.categorySummary.slice(0, 3).map((cat, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selection Checkmark */}
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-primary-50 text-slate-400 group-hover:text-primary-600 flex items-center justify-center shrink-0 transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 px-5">
          <span>Active Floor: <strong className="text-slate-700">Floor {selectedFloorCode}</strong></span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
