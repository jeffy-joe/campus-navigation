import React from 'react';
import { Room } from '../../types/campus';
import { X, Navigation, Users, CheckCircle2, AlertCircle, Sparkles, Clock } from 'lucide-react';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onNavigateHere: (roomId: string) => void;
  onSetAsStart: (roomId: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  onClose,
  onNavigateHere,
  onSetAsStart,
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 w-full sm:max-w-md overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 uppercase tracking-wider inline-block mb-2">
            Floor {room.floorNumber} • {room.category}
          </span>
          <h3 className="text-xl font-black tracking-tight">{room.name}</h3>
          <p className="text-xs text-indigo-100 font-medium">Room Code: {room.code}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">{room.description}</p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Capacity</span>
                <span className="text-sm font-bold text-slate-700">{room.capacity || 50} Students</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Status</span>
                <span className="text-sm font-bold text-emerald-600">{room.currentStatus || 'Available'}</span>
              </div>
            </div>
          </div>

          {/* Facilities */}
          {room.facilities && room.facilities.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Equipped With
              </span>
              <div className="flex flex-wrap gap-1.5">
                {room.facilities.map((fac, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={() => {
                onNavigateHere(room.id);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Navigate Here</span>
            </button>

            <button
              onClick={() => {
                onSetAsStart(room.id);
                onClose();
              }}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Set as Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
