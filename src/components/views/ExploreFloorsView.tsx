import React, { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Navigation, 
  Dumbbell, 
  Cpu, 
  GraduationCap, 
  Monitor, 
  Users, 
  BookOpen, 
  Laptop, 
  FlaskConical, 
  Theater, 
  DoorOpen,
  Sparkles,
  Plane,
  Car
} from 'lucide-react';
import { CAMPUS_FLOORS } from '../../data/campusData';
import { Floor, Room } from '../../types/campus';

interface ExploreFloorsViewProps {
  onSelectRoom: (room: Room) => void;
  onNavigateToRoom: (roomId: string) => void;
  onViewFloorOnMap: (floorCode: string) => void;
}

export const ExploreFloorsView: React.FC<ExploreFloorsViewProps> = ({
  onSelectRoom,
  onNavigateToRoom,
  onViewFloorOnMap,
}) => {
  const [expandedFloorId, setExpandedFloorId] = useState<string | null>(null);

  const getFloorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-pink-600" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-rose-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-purple-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'Plane': return <Plane className="w-5 h-5 text-blue-600" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-sky-600" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-cyan-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-700" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-green-600" />;
      case 'Users': return <Users className="w-5 h-5 text-green-700" />;
      case 'Theater': return <Theater className="w-5 h-5 text-lime-600" />;
      case 'DoorOpen': return <DoorOpen className="w-5 h-5 text-orange-600" />;
      case 'Car': return <Car className="w-5 h-5 text-rose-600" />;
      default: return <Building2 className="w-5 h-5 text-primary-600" />;
    }
  };

  const toggleFloor = (id: string) => {
    setExpandedFloorId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-28 lg:pb-10 animate-in fade-in">
      {/* Floor Accordions */}
      <div className="space-y-2.5 sm:space-y-3">
        {CAMPUS_FLOORS.map((floor) => {
          const isExpanded = expandedFloorId === floor.id;
          return (
            <div
              key={floor.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden transition-all duration-200"
            >
              {/* Floor Header Accordion Button */}
              <button
                onClick={() => toggleFloor(floor.id)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors gap-2"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${floor.bgColor} flex items-center justify-center border border-slate-100 shrink-0`}>
                    <span className={`text-base sm:text-lg font-black ${floor.textColor}`}>{floor.code}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="truncate">{floor.title}</span>
                      {(floor.code === '4' || floor.code === '7') && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-[9px] sm:text-[10px] shrink-0">
                          Blueprint
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{floor.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 shrink-0">
                  <div className="hidden md:flex items-center gap-1.5">
                    {floor.categorySummary.slice(0, 2).map((cat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Always-visible View Map button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewFloorOnMap(floor.code);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-600 border border-primary-100 text-[11px] font-bold transition-colors shrink-0 active:scale-95"
                    title={`View Floor ${floor.code} Map`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View Map</span>
                  </button>

                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Room Directory */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100/80 bg-slate-50/40 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl pt-2">
                    {floor.description}
                  </p>

                  {/* Rooms Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {floor.rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => onSelectRoom(room)}
                        className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-primary-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-extrabold text-primary-600 uppercase tracking-wider">
                              {room.code}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                            {room.name}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                          <span className="text-slate-400 font-medium">
                            {room.capacity ? `Capacity: ${room.capacity}` : 'Facility'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToRoom(room.id);
                            }}
                            className="text-primary-600 group-hover:text-primary-700 font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>Navigate</span>
                            <Navigation className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
