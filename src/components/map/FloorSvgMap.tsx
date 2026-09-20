import React from 'react';
import { CAMPUS_FLOORS } from '../../data/campusData';
import { Room } from '../../types/campus';

interface FloorSvgMapProps {
  floorCode: string;
  highlightedRoomId?: string;
  destinationRoomId?: string;
  startRoomId?: string;
  onRoomClick: (room: Room) => void;
  showRoute?: boolean;
}

export const FloorSvgMap: React.FC<FloorSvgMapProps> = ({
  floorCode,
  highlightedRoomId,
  destinationRoomId = 'node-ai-lab',
  startRoomId = 'node-elevator-4',
  onRoomClick,
  showRoute = true,
}) => {
  const currentFloor = CAMPUS_FLOORS.find((f) => f.code === floorCode) || CAMPUS_FLOORS[7];

  // Floor 4: Detailed AI & Tech Labs Blueprint
  if (floorCode === '4') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg
          viewBox="0 0 450 480"
          className="w-full h-full max-h-[560px] drop-shadow-sm font-sans"
        >
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Building Boundary */}
          <rect x="50" y="30" width="350" height="430" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />

          {/* Corridor */}
          <path
            d="M 120 160 L 250 160 L 250 290 L 270 290 L 270 340 L 190 340 L 190 290 L 120 290 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <text x="210" y="225" fill="#94A3B8" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1">
            TECH CORRIDOR
          </text>

          {/* ROOM 1: Artificial Intelligence Lab (Top Left) */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x="70"
              y="50"
              width="150"
              height="105"
              fill={highlightedRoomId === 'node-ai-lab' || destinationRoomId === 'node-ai-lab' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'node-ai-lab' || destinationRoomId === 'node-ai-lab' ? '#0284C7' : '#94A3B8'}
              strokeWidth={destinationRoomId === 'node-ai-lab' ? '2.5' : '1.5'}
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="145" y="90" fill="#0369A1" fontSize="11" fontWeight="800" textAnchor="middle">
              AI-401
            </text>
            <text x="145" y="108" fill="#0F172A" fontSize="12" fontWeight="700" textAnchor="middle">
              Artificial Intelligence
            </text>
            <text x="145" y="125" fill="#64748B" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Lab (RTX 4090)
            </text>
          </g>

          {/* ROOM 2: Machine Learning Lab (Top Right) */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x="220"
              y="50"
              width="160"
              height="105"
              fill={highlightedRoomId === 'node-ml-lab' || destinationRoomId === 'node-ml-lab' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'node-ml-lab' ? '#0284C7' : '#94A3B8'}
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="300" y="90" fill="#0369A1" fontSize="11" fontWeight="800" textAnchor="middle">
              ML-402
            </text>
            <text x="300" y="108" fill="#0F172A" fontSize="12" fontWeight="700" textAnchor="middle">
              Machine Learning
            </text>
            <text x="300" y="125" fill="#64748B" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Lab
            </text>
          </g>

          {/* ROOM 3: Data Science Lab (Mid Right) */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x="250"
              y="155"
              width="130"
              height="95"
              fill={highlightedRoomId === 'node-datascience-lab' || destinationRoomId === 'node-datascience-lab' ? '#E0F2FE' : '#FFFFFF'}
              stroke="#94A3B8"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="315" y="195" fill="#0369A1" fontSize="10.5" fontWeight="800" textAnchor="middle">
              DS-404
            </text>
            <text x="315" y="212" fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">
              Data Science
            </text>
            <text x="315" y="228" fill="#64748B" fontSize="9" fontWeight="600" textAnchor="middle">
              Lab
            </text>
          </g>

          {/* ROOM 4: Cyber Security Lab (Mid Left) */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x="70"
              y="220"
              width="100"
              height="80"
              fill={highlightedRoomId === 'node-cyber-lab' || destinationRoomId === 'node-cyber-lab' ? '#E0F2FE' : '#FFFFFF'}
              stroke="#94A3B8"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="120" y="252" fill="#0369A1" fontSize="10.5" fontWeight="800" textAnchor="middle">
              CYBER-403
            </text>
            <text x="120" y="268" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">
              Cyber Security
            </text>
            <text x="120" y="282" fill="#64748B" fontSize="9" fontWeight="600" textAnchor="middle">
              Lab
            </text>
          </g>

          {/* ROOM 5: Placement Office (Bottom Center) */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[4])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x="170"
              y="340"
              width="180"
              height="95"
              fill="#ECFEFF"
              stroke="#06B6D4"
              strokeWidth="2"
              className="group-hover:fill-cyan-100/70 transition-colors"
            />
            <text x="260" y="375" fill="#0E7490" fontSize="11" fontWeight="800" textAnchor="middle">
              PLACE-405
            </text>
            <text x="260" y="392" fill="#155E75" fontSize="12" fontWeight="700" textAnchor="middle">
              Placement Office &amp;
            </text>
            <text x="260" y="408" fill="#155E75" fontSize="12" fontWeight="700" textAnchor="middle">
              Corporate Cell
            </text>
          </g>

          {/* ELEVATOR */}
          <g className="cursor-pointer group">
            <rect x="180" y="275" width="60" height="55" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" className="group-hover:fill-slate-50" />
            <text x="210" y="307" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Elevator</text>
          </g>

          {/* STAIRCASE */}
          <g className="cursor-pointer group">
            <rect x="70" y="165" width="70" height="45" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" className="group-hover:fill-slate-50" />
            <text x="105" y="192" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Staircase</text>
          </g>

          {/* RESTROOM */}
          <g className="cursor-pointer group">
            <rect x="70" y="310" width="90" height="125" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" className="group-hover:fill-slate-50" />
            <text x="115" y="380" fill="#475569" fontSize="10.5" fontWeight="600" textAnchor="middle">Restroom</text>
          </g>

          {/* ROUTE OVERLAY */}
          {showRoute && (
            <g>
              <path
                d="M 210 275 L 210 210 L 145 210 L 145 155"
                fill="none"
                stroke="#0284C7"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="animate-route-dash"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#routeGlow)"
              />
              <g transform="translate(210, 275)">
                <circle r="12" fill="#38BDF8" opacity="0.3" className="animate-ping" />
                <circle r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
              </g>
              <g transform="translate(145, 155)">
                <circle r="14" fill="#0284C7" opacity="0.3" className="animate-pulse" />
                <path
                  d="M 0 -18 C -7 -18 -10 -11 -10 -4 C -10 4 0 16 0 16 C 0 16 10 4 10 -4 C 10 -11 7 -18 0 -18 Z"
                  fill="#0284C7"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="-6" r="3.5" fill="#FFFFFF" />
              </g>
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 7: Exact Replica of Official Architectural Blueprint Image
  if (floorCode === '7') {
    const isRoomSelected = (id: string) => highlightedRoomId === id || destinationRoomId === id;

    return (
      <div className="w-full h-full min-h-[550px] flex items-center justify-center p-2 relative select-none bg-white">
        <svg viewBox="0 0 440 850" className="w-full h-full max-h-[820px] font-sans">
          {/* Compass Indicators */}
          <text x="60" y="32" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">NE</text>
          <text x="220" y="32" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">E</text>
          <text x="380" y="32" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">SE</text>

          <text x="24" y="425" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">N</text>
          <text x="416" y="425" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">S</text>

          <text x="60" y="835" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">NW</text>
          <text x="220" y="835" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">E</text>
          <text x="380" y="835" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">SW</text>

          {/* Outer Blueprint Container Border */}
          <rect x="42" y="45" width="356" height="765" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />

          {/* Floor Building Shell Boundary */}
          <path
            d="M 110 70 L 330 70 L 330 720 L 310 775 L 130 775 L 110 720 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1.5"
          />

          {/* Bottom Curved Entrance Glass Arc */}
          <path d="M 110 725 Q 220 775 330 725" fill="none" stroke="#000000" strokeWidth="2" />
          <path d="M 110 750 L 140 780 M 330 750 L 300 780" stroke="#000000" strokeWidth="2" />

          {/* Central Corridor Hallway */}
          <path d="M 195 70 L 195 720 M 215 70 L 215 720" stroke="#000000" strokeWidth="1" strokeDasharray="none" />

          {/* ──────── RIGHT SIDE ROOMS (TOP TO BOTTOM) ──────── */}

          {/* S-Lab 1&2 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[0])} className="cursor-pointer group">
            <rect
              x="215"
              y="70"
              width="115"
              height="105"
              fill={isRoomSelected('node-slab-12') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            {/* Doorway opening */}
            <path d="M 215 145 A 15 15 0 0 1 200 160" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="125" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">S-Lab 1&amp;2</text>
          </g>

          {/* S-Classroom 5 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[1])} className="cursor-pointer group">
            <rect
              x="215"
              y="175"
              width="115"
              height="80"
              fill={isRoomSelected('node-s-cr-5') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 240 A 15 15 0 0 1 200 255" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="220" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">S-Classroom 5</text>
          </g>

          {/* Classroom 4 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[2])} className="cursor-pointer group">
            <rect
              x="215"
              y="255"
              width="115"
              height="80"
              fill={isRoomSelected('node-cr-4') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 320 A 15 15 0 0 1 200 335" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="300" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">Classroom 4</text>
          </g>

          {/* S-Lab 3&4 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[3])} className="cursor-pointer group">
            <rect
              x="215"
              y="335"
              width="115"
              height="130"
              fill={isRoomSelected('node-slab-34') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 440 A 15 15 0 0 1 200 455" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="405" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">S-Lab 3&amp;4</text>
          </g>

          {/* Classroom 3 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[4])} className="cursor-pointer group">
            <rect
              x="215"
              y="465"
              width="115"
              height="80"
              fill={isRoomSelected('node-cr-3') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 530 A 15 15 0 0 1 200 545" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="510" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">Classroom 3</text>
          </g>

          {/* S-Classroom 2 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[5])} className="cursor-pointer group">
            <rect
              x="215"
              y="545"
              width="115"
              height="75"
              fill={isRoomSelected('node-s-cr-2') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 605 A 15 15 0 0 1 200 620" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="587" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">S-Classroom 2</text>
          </g>

          {/* S.Classroom 1 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[6])} className="cursor-pointer group">
            <rect
              x="215"
              y="620"
              width="115"
              height="80"
              fill={isRoomSelected('node-s-cr-1') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <path d="M 215 680 A 15 15 0 0 1 200 695" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="272" y="665" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle">S.Classroom 1</text>
          </g>

          {/* ──────── LEFT SIDE ROOMS & CORE (TOP TO BOTTOM) ──────── */}

          {/* Classroom 6 */}
          <g onClick={() => onRoomClick(currentFloor.rooms[7])} className="cursor-pointer group">
            <rect
              x="110"
              y="70"
              width="85"
              height="90"
              fill={isRoomSelected('node-cr-6') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="152" y="120" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle">Classroom 6</text>
          </g>

          {/* Staff Rooms */}
          <g onClick={() => onRoomClick(currentFloor.rooms[8])} className="cursor-pointer group">
            <rect
              x="122"
              y="160"
              width="73"
              height="80"
              fill={isRoomSelected('node-staff-7') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            {/* Door swing */}
            <path d="M 160 240 A 12 12 0 0 1 172 252" fill="none" stroke="#000000" strokeWidth="1" />
            <text x="158" y="195" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">Staff</text>
            <text x="158" y="210" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">Rooms</text>
          </g>

          {/* UPS */}
          <g className="cursor-pointer">
            <rect x="110" y="250" width="85" height="22" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <text x="152" y="265" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle">UPS</text>
          </g>

          {/* ELECTRICAL ROOM */}
          <g className="cursor-pointer">
            <rect x="110" y="272" width="85" height="28" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <text x="152" y="286" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle">ELECTRICAL</text>
            <text x="152" y="296" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle">ROOM</text>
          </g>

          {/* LADIES TOILET */}
          <g className="cursor-pointer">
            <rect x="110" y="300" width="85" height="50" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            {/* Toilet cubicle stalls */}
            <line x1="130" y1="300" x2="130" y2="335" stroke="#000000" strokeWidth="1" />
            <line x1="150" y1="300" x2="150" y2="335" stroke="#000000" strokeWidth="1" />
            <text x="152" y="342" fill="#000000" fontSize="9.5" fontWeight="bold" textAnchor="middle">LADIES TOILET</text>
          </g>

          {/* LIFT (Double Lift Core) */}
          <g className="cursor-pointer">
            <rect x="110" y="350" width="85" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <line x1="152" y1="350" x2="152" y2="380" stroke="#000000" strokeWidth="1" />
            {/* Cross diagonal lift lines */}
            <line x1="110" y1="350" x2="152" y2="380" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="380" x2="152" y2="350" stroke="#000000" strokeWidth="0.8" />
            <text x="131" y="370" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle">LIFT</text>
            <text x="173" y="370" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle">LIFT</text>
          </g>

          {/* STAIRCASE */}
          <g className="cursor-pointer">
            <rect x="110" y="380" width="85" height="70" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            {/* Stair Treads */}
            <line x1="110" y1="390" x2="195" y2="390" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="400" x2="195" y2="400" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="410" x2="195" y2="410" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="420" x2="195" y2="420" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="430" x2="195" y2="430" stroke="#000000" strokeWidth="0.8" />
            <line x1="152" y1="380" x2="152" y2="450" stroke="#000000" strokeWidth="1" />
            <text x="152" y="388" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle">STAIRCASE</text>
          </g>

          {/* GENTS TOILET */}
          <g className="cursor-pointer">
            <rect x="110" y="450" width="85" height="50" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <line x1="130" y1="450" x2="130" y2="485" stroke="#000000" strokeWidth="1" />
            <line x1="150" y1="450" x2="150" y2="485" stroke="#000000" strokeWidth="1" />
            <text x="152" y="493" fill="#000000" fontSize="9.5" fontWeight="bold" textAnchor="middle">GENTS TOILET</text>
          </g>

          {/* Breakout Space */}
          <g onClick={() => onRoomClick(currentFloor.rooms[9])} className="cursor-pointer group">
            <rect
              x="110"
              y="500"
              width="85"
              height="90"
              fill={isRoomSelected('node-breakout-7') ? '#E0F2FE' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="1.5"
              className="group-hover:fill-sky-50 transition-colors"
            />
            <text x="152" y="540" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle">Breakout</text>
            <text x="152" y="556" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle">Space</text>
          </g>

          {/* Lower STAIRCASE & LIFT CORE */}
          <g className="cursor-pointer">
            <rect x="110" y="590" width="85" height="55" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            {/* Stair Treads */}
            <line x1="110" y1="600" x2="170" y2="600" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="610" x2="170" y2="610" stroke="#000000" strokeWidth="0.8" />
            <line x1="110" y1="620" x2="170" y2="620" stroke="#000000" strokeWidth="0.8" />
            <line x1="140" y1="590" x2="140" y2="645" stroke="#000000" strokeWidth="1" />
          </g>

          {/* LIFT LIFT & LIFT */}
          <g className="cursor-pointer">
            <rect x="110" y="645" width="30" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <rect x="143" y="645" width="30" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <rect x="110" y="685" width="30" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <text x="125" y="663" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">LIFT</text>
            <text x="158" y="663" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">LIFT</text>
            <text x="125" y="703" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">LIFT</text>
          </g>

          {/* Lobby Area */}
          <text x="180" y="690" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle">Lobby</text>


          {/* ──────── SOLID BLACK STRUCTURAL COLUMNS ──────── */}

          {/* Row 1 (y=70) */}
          <rect x="105" y="65" width="10" height="10" fill="#000000" />
          <rect x="210" y="65" width="10" height="10" fill="#000000" />
          <rect x="325" y="65" width="10" height="10" fill="#000000" />

          {/* Row 2 (y=175) */}
          <rect x="105" y="170" width="10" height="10" fill="#000000" />
          <rect x="210" y="170" width="10" height="10" fill="#000000" />
          <rect x="325" y="170" width="10" height="10" fill="#000000" />

          {/* Row 3 (y=255) */}
          <rect x="210" y="250" width="10" height="10" fill="#000000" />
          <rect x="325" y="250" width="10" height="10" fill="#000000" />

          {/* Row 4 (y=335) */}
          <rect x="210" y="330" width="10" height="10" fill="#000000" />
          <rect x="325" y="330" width="10" height="10" fill="#000000" />

          {/* Row 5 (y=465) */}
          <rect x="105" y="460" width="10" height="10" fill="#000000" />
          <rect x="210" y="460" width="10" height="10" fill="#000000" />
          <rect x="325" y="460" width="10" height="10" fill="#000000" />

          {/* Row 6 (y=545) */}
          <rect x="105" y="540" width="10" height="10" fill="#000000" />
          <rect x="210" y="540" width="10" height="10" fill="#000000" />
          <rect x="325" y="540" width="10" height="10" fill="#000000" />

          {/* Row 7 (y=620) */}
          <rect x="105" y="615" width="10" height="10" fill="#000000" />
          <rect x="210" y="615" width="10" height="10" fill="#000000" />
          <rect x="325" y="615" width="10" height="10" fill="#000000" />

          {/* Row 8 (y=700) */}
          <rect x="325" y="695" width="10" height="10" fill="#000000" />
        </svg>
      </div>
    );
  }

  // Floor T: Auto-generated Blueprint
  if (floorCode === 'T') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-T" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-T" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-T)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#DB2777" opacity="0.12" />
          <text x="225" y="40" fill="#DB2777" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR T â€” TERRACE</text>

          {/* Room 1: Pickleball Court */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'terrace-pickleball' || destinationRoomId === 'terrace-pickleball' ? '#FDF2F8' : '#FFFFFF'}
              stroke={highlightedRoomId === 'terrace-pickleball' || destinationRoomId === 'terrace-pickleball' ? '#DB2777' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'terrace-pickleball' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#DB2777" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">T-101</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Pickleball Court</text>
            

          </g>
          {/* Room 2: Futsal Court */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'terrace-futsal' || destinationRoomId === 'terrace-futsal' ? '#FDF2F8' : '#FFFFFF'}
              stroke={highlightedRoomId === 'terrace-futsal' || destinationRoomId === 'terrace-futsal' ? '#DB2777' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'terrace-futsal' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#DB2777" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">T-102</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Futsal Court</text>
            

          </g>
          {/* Room 3: Amphitheatre */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'terrace-amphitheatre' || destinationRoomId === 'terrace-amphitheatre' ? '#FDF2F8' : '#FFFFFF'}
              stroke={highlightedRoomId === 'terrace-amphitheatre' || destinationRoomId === 'terrace-amphitheatre' ? '#DB2777' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'terrace-amphitheatre' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#DB2777" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">T-103</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Amphitheatre</text>
            

          </g>
          {/* Room 4: CafÃ© */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'terrace-cafe' || destinationRoomId === 'terrace-cafe' ? '#FDF2F8' : '#FFFFFF'}
              stroke={highlightedRoomId === 'terrace-cafe' || destinationRoomId === 'terrace-cafe' ? '#DB2777' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'terrace-cafe' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#DB2777" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">T-104</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">CafÃ©</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#DB2777" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#DB2777" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 12: Auto-generated Blueprint
  if (floorCode === '12') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 506" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-12" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-12" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="476" rx="10" fill="url(#grid-12)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="476" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#7C3AED" opacity="0.12" />
          <text x="225" y="40" fill="#7C3AED" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 12 â€” EXECUTIVE</text>

          {/* Room 1: Chairman Chamber */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor12-chairman' || destinationRoomId === 'floor12-chairman' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor12-chairman' || destinationRoomId === 'floor12-chairman' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor12-chairman' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">CH-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Chairman Chamber</text>
            

          </g>
          {/* Room 2: Vels Corp. Office */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor12-velscorp' || destinationRoomId === 'floor12-velscorp' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor12-velscorp' || destinationRoomId === 'floor12-velscorp' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor12-velscorp' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">VC-01</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Vels Corp. Office</text>
            

          </g>
          {/* Room 3: Preview Theatre */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor12-preview' || destinationRoomId === 'floor12-preview' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor12-preview' || destinationRoomId === 'floor12-preview' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor12-preview' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">PT-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Preview Theatre</text>
            

          </g>
          {/* Room 4: Conference Hall */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor12-conf' || destinationRoomId === 'floor12-conf' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor12-conf' || destinationRoomId === 'floor12-conf' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor12-conf' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">CONF-01</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Conference Hall</text>
            

          </g>
          {/* Room 5: VIP Lounge */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[4])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={249}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor12-vip' || destinationRoomId === 'floor12-vip' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor12-vip' || destinationRoomId === 'floor12-vip' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor12-vip' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={271} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">VIP-01</text>
            <text x={142.5} y={289} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">VIP Lounge</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="384" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="356" r="10" fill="#7C3AED" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="356" r="5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 11: Auto-generated Blueprint
  if (floorCode === '11') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-11" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-11" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-11)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#6D28D9" opacity="0.12" />
          <text x="225" y="40" fill="#6D28D9" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 11 â€” MBA WING</text>

          {/* Room 1: MBA Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor11-mba-dept' || destinationRoomId === 'floor11-mba-dept' ? '#EDE9FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor11-mba-dept' || destinationRoomId === 'floor11-mba-dept' ? '#6D28D9' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor11-mba-dept' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#6D28D9" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MBA-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MBA Department</text>
            

          </g>
          {/* Room 2: MBA Classroom 1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor11-mba-cr1' || destinationRoomId === 'floor11-mba-cr1' ? '#EDE9FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor11-mba-cr1' || destinationRoomId === 'floor11-mba-cr1' ? '#6D28D9' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor11-mba-cr1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#6D28D9" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MBA-101</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MBA Classroom 1</text>
            

          </g>
          {/* Room 3: MBA Classroom 2 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor11-mba-cr2' || destinationRoomId === 'floor11-mba-cr2' ? '#EDE9FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor11-mba-cr2' || destinationRoomId === 'floor11-mba-cr2' ? '#6D28D9' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor11-mba-cr2' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#6D28D9" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MBA-102</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MBA Classroom 2</text>
            

          </g>
          {/* Room 4: Staff Room */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor11-mba-staff' || destinationRoomId === 'floor11-mba-staff' ? '#EDE9FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor11-mba-staff' || destinationRoomId === 'floor11-mba-staff' ? '#6D28D9' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor11-mba-staff' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#6D28D9" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MBA-103</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Staff Room</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#6D28D9" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#6D28D9" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 10: Auto-generated Blueprint
  if (floorCode === '10') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-10" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-10" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-10)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#7C3AED" opacity="0.12" />
          <text x="225" y="40" fill="#7C3AED" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 10 â€” MBA & INCUBATION</text>

          {/* Room 1: MBA Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor10-mba' || destinationRoomId === 'floor10-mba' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor10-mba' || destinationRoomId === 'floor10-mba' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor10-mba' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MBA-201</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MBA Department</text>
            

          </g>
          {/* Room 2: Incubation Room */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor10-incubation' || destinationRoomId === 'floor10-incubation' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor10-incubation' || destinationRoomId === 'floor10-incubation' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor10-incubation' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">INC-01</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Incubation Room</text>
            

          </g>
          {/* Room 3: Idea Lab */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor10-idealab' || destinationRoomId === 'floor10-idealab' ? '#F5F3FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor10-idealab' || destinationRoomId === 'floor10-idealab' ? '#7C3AED' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor10-idealab' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#7C3AED" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">IDEA-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Idea Lab</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#7C3AED" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 9: Auto-generated Blueprint
  if (floorCode === '9') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-9" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-9" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-9)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#0369A1" opacity="0.12" />
          <text x="225" y="40" fill="#0369A1" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 9 â€” B.COM DEPT</text>

          {/* Room 1: B.Com Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor9-bcom-dept' || destinationRoomId === 'floor9-bcom-dept' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor9-bcom-dept' || destinationRoomId === 'floor9-bcom-dept' ? '#0369A1' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor9-bcom-dept' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#0369A1" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">COM-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">B.Com Department</text>
            

          </g>
          {/* Room 2: Commerce Class 1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor9-bcom-cr1' || destinationRoomId === 'floor9-bcom-cr1' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor9-bcom-cr1' || destinationRoomId === 'floor9-bcom-cr1' ? '#0369A1' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor9-bcom-cr1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#0369A1" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">COM-101</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Commerce Class 1</text>
            

          </g>
          {/* Room 3: Commerce Class 2 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor9-bcom-cr2' || destinationRoomId === 'floor9-bcom-cr2' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor9-bcom-cr2' || destinationRoomId === 'floor9-bcom-cr2' ? '#0369A1' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor9-bcom-cr2' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#0369A1" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">COM-102</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Commerce Class 2</text>
            

          </g>
          {/* Room 4: Commerce Lab */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor9-bcom-lab' || destinationRoomId === 'floor9-bcom-lab' ? '#E0F2FE' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor9-bcom-lab' || destinationRoomId === 'floor9-bcom-lab' ? '#0369A1' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor9-bcom-lab' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#0369A1" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">COM-LAB</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Commerce Lab</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#0369A1" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#0369A1" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 8: Auto-generated Blueprint
  if (floorCode === '8') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-8" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-8" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-8)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#1D4ED8" opacity="0.12" />
          <text x="225" y="40" fill="#1D4ED8" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 8 â€” AVIATION DEPT</text>

          {/* Room 1: Aviation Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor8-aviation' || destinationRoomId === 'floor8-aviation' ? '#EFF6FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor8-aviation' || destinationRoomId === 'floor8-aviation' ? '#1D4ED8' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor8-aviation' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#1D4ED8" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">AVN-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Aviation Department</text>
            

          </g>
          {/* Room 2: Aviation Class 1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor8-avn-cr1' || destinationRoomId === 'floor8-avn-cr1' ? '#EFF6FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor8-avn-cr1' || destinationRoomId === 'floor8-avn-cr1' ? '#1D4ED8' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor8-avn-cr1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#1D4ED8" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">AVN-101</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Aviation Class 1</text>
            

          </g>
          {/* Room 3: Aviation Class 2 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor8-avn-cr2' || destinationRoomId === 'floor8-avn-cr2' ? '#EFF6FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor8-avn-cr2' || destinationRoomId === 'floor8-avn-cr2' ? '#1D4ED8' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor8-avn-cr2' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#1D4ED8" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">AVN-102</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Aviation Class 2</text>
            

          </g>
          {/* Room 4: Briefing Room */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor8-briefing' || destinationRoomId === 'floor8-briefing' ? '#EFF6FF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor8-briefing' || destinationRoomId === 'floor8-briefing' ? '#1D4ED8' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor8-briefing' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#1D4ED8" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">AVN-103</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Briefing Room</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#1D4ED8" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 6: Auto-generated Blueprint
  if (floorCode === '6') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-6" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-6" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-6)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#0891B2" opacity="0.12" />
          <text x="225" y="40" fill="#0891B2" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 6 â€” B.SC & CAFETERIA</text>

          {/* Room 1: B.Sc Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor6-bsc' || destinationRoomId === 'floor6-bsc' ? '#ECFEFF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor6-bsc' || destinationRoomId === 'floor6-bsc' ? '#0891B2' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor6-bsc' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#0891B2" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BSC-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">B.Sc Department</text>
            

          </g>
          {/* Room 2: Science Class 1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor6-bsc-cr1' || destinationRoomId === 'floor6-bsc-cr1' ? '#ECFEFF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor6-bsc-cr1' || destinationRoomId === 'floor6-bsc-cr1' ? '#0891B2' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor6-bsc-cr1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#0891B2" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BSC-101</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Science Class 1</text>
            

          </g>
          {/* Room 3: Science Lab */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor6-bsc-lab' || destinationRoomId === 'floor6-bsc-lab' ? '#ECFEFF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor6-bsc-lab' || destinationRoomId === 'floor6-bsc-lab' ? '#0891B2' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor6-bsc-lab' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#0891B2" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BSC-LAB</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Science Lab</text>
            

          </g>
          {/* Room 4: Cafeteria */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor6-cafe' || destinationRoomId === 'floor6-cafe' ? '#ECFEFF' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor6-cafe' || destinationRoomId === 'floor6-cafe' ? '#0891B2' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor6-cafe' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#0891B2" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">CAFE-6</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Cafeteria</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#0891B2" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#0891B2" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 5: Auto-generated Blueprint
  if (floorCode === '5') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-5" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-5" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-5)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#0D9488" opacity="0.12" />
          <text x="225" y="40" fill="#0D9488" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 5 â€” B.SC & MCA</text>

          {/* Room 1: B.Sc Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor5-bsc' || destinationRoomId === 'floor5-bsc' ? '#F0FDFA' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor5-bsc' || destinationRoomId === 'floor5-bsc' ? '#0D9488' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor5-bsc' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#0D9488" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BSC-02</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">B.Sc Department</text>
            

          </g>
          {/* Room 2: MCA Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor5-mca' || destinationRoomId === 'floor5-mca' ? '#F0FDFA' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor5-mca' || destinationRoomId === 'floor5-mca' ? '#0D9488' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor5-mca' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#0D9488" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MCA-01</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MCA Department</text>
            

          </g>
          {/* Room 3: MCA Computer Lab */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor5-mca-lab' || destinationRoomId === 'floor5-mca-lab' ? '#F0FDFA' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor5-mca-lab' || destinationRoomId === 'floor5-mca-lab' ? '#0D9488' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor5-mca-lab' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#0D9488" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MCA-LAB</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MCA Computer Lab</text>
            

          </g>
          {/* Room 4: MCA Classroom */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor5-mca-cr' || destinationRoomId === 'floor5-mca-cr' ? '#F0FDFA' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor5-mca-cr' || destinationRoomId === 'floor5-mca-cr' ? '#0D9488' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor5-mca-cr' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#0D9488" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">MCA-101</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">MCA Classroom</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#0D9488" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 3: Auto-generated Blueprint
  if (floorCode === '3') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-3)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#059669" opacity="0.12" />
          <text x="225" y="40" fill="#059669" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 3 â€” BCA DEPARTMENT</text>

          {/* Room 1: BCA Department */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor3-bca' || destinationRoomId === 'floor3-bca' ? '#ECFDF5' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor3-bca' || destinationRoomId === 'floor3-bca' ? '#059669' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor3-bca' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#059669" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BCA-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">BCA Department</text>
            

          </g>
          {/* Room 2: BCA Lab 1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor3-bca-lab1' || destinationRoomId === 'floor3-bca-lab1' ? '#ECFDF5' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor3-bca-lab1' || destinationRoomId === 'floor3-bca-lab1' ? '#059669' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor3-bca-lab1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#059669" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BCA-LAB1</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">BCA Lab 1</text>
            

          </g>
          {/* Room 3: BCA Lab 2 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor3-bca-lab2' || destinationRoomId === 'floor3-bca-lab2' ? '#ECFDF5' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor3-bca-lab2' || destinationRoomId === 'floor3-bca-lab2' ? '#059669' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor3-bca-lab2' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#059669" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BCA-LAB2</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">BCA Lab 2</text>
            

          </g>
          {/* Room 4: BCA Classroom */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor3-bca-cr' || destinationRoomId === 'floor3-bca-cr' ? '#ECFDF5' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor3-bca-cr' || destinationRoomId === 'floor3-bca-cr' ? '#059669' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor3-bca-cr' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#059669" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">BCA-101</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">BCA Classroom</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#059669" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 2: Auto-generated Blueprint
  if (floorCode === '2') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 506" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="476" rx="10" fill="url(#grid-2)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="476" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#D97706" opacity="0.12" />
          <text x="225" y="40" fill="#D97706" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 2 â€” ADMIN & STUDENT</text>

          {/* Room 1: Pro Vice Chancellor */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor2-pvc' || destinationRoomId === 'floor2-pvc' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor2-pvc' || destinationRoomId === 'floor2-pvc' ? '#D97706' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor2-pvc' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#D97706" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">ADMIN-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Pro Vice Chancellor</text>
            

          </g>
          {/* Room 2: Accounts &amp; Admin */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor2-accounts' || destinationRoomId === 'floor2-accounts' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor2-accounts' || destinationRoomId === 'floor2-accounts' ? '#D97706' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor2-accounts' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#D97706" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">ADMIN-02</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Accounts &amp; Admin</text>
            

          </g>
          {/* Room 3: Infirmary */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor2-infirmary' || destinationRoomId === 'floor2-infirmary' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor2-infirmary' || destinationRoomId === 'floor2-infirmary' ? '#D97706' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor2-infirmary' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#D97706" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">INFIRM-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Infirmary</text>
            

          </g>
          {/* Room 4: Gym &amp; Indoor Games */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor2-gym' || destinationRoomId === 'floor2-gym' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor2-gym' || destinationRoomId === 'floor2-gym' ? '#D97706' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor2-gym' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#D97706" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">GYM-01</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Gym &amp; Indoor Games</text>
            

          </g>
          {/* Room 5: Student Clubs */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[4])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={249}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor2-clubs' || destinationRoomId === 'floor2-clubs' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor2-clubs' || destinationRoomId === 'floor2-clubs' ? '#D97706' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor2-clubs' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={271} fill="#D97706" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">CLUB-01</text>
            <text x={142.5} y={289} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Student Clubs</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="384" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="356" r="10" fill="#D97706" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="356" r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor 1: Auto-generated Blueprint
  if (floorCode === '1') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-1)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#EA580C" opacity="0.12" />
          <text x="225" y="40" fill="#EA580C" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR 1 â€” AUDITORIUM & VIP</text>

          {/* Room 1: Auditorium */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor1-auditorium' || destinationRoomId === 'floor1-auditorium' ? '#FFF7ED' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor1-auditorium' || destinationRoomId === 'floor1-auditorium' ? '#EA580C' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor1-auditorium' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#EA580C" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">AUD-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Auditorium</text>
            

          </g>
          {/* Room 2: IQAC Room */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor1-iqac' || destinationRoomId === 'floor1-iqac' ? '#FFF7ED' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor1-iqac' || destinationRoomId === 'floor1-iqac' ? '#EA580C' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor1-iqac' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#EA580C" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">IQAC-01</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">IQAC Room</text>
            

          </g>
          {/* Room 3: VIP Lounge */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'floor1-vip' || destinationRoomId === 'floor1-vip' ? '#FFF7ED' : '#FFFFFF'}
              stroke={highlightedRoomId === 'floor1-vip' || destinationRoomId === 'floor1-vip' ? '#EA580C' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'floor1-vip' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#EA580C" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">VIP-1F</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">VIP Lounge</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#EA580C" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor M: Auto-generated Blueprint
  if (floorCode === 'M') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-M" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-M" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-M)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#B45309" opacity="0.12" />
          <text x="225" y="40" fill="#B45309" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR M â€” LIBRARY FLOOR</text>

          {/* Room 1: Central Library */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'mezzanine-library' || destinationRoomId === 'mezzanine-library' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'mezzanine-library' || destinationRoomId === 'mezzanine-library' ? '#B45309' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'mezzanine-library' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#B45309" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">LIB-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Central Library</text>
            

          </g>
          {/* Room 2: Digital Library */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'mezzanine-digital' || destinationRoomId === 'mezzanine-digital' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'mezzanine-digital' || destinationRoomId === 'mezzanine-digital' ? '#B45309' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'mezzanine-digital' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#B45309" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">LIB-02</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Digital Library</text>
            

          </g>
          {/* Room 3: Reprography */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'mezzanine-repro' || destinationRoomId === 'mezzanine-repro' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'mezzanine-repro' || destinationRoomId === 'mezzanine-repro' ? '#B45309' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'mezzanine-repro' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#B45309" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">REPRO-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Reprography</text>
            

          </g>
          {/* Room 4: Virtual Learning Centre */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'mezzanine-vlc' || destinationRoomId === 'mezzanine-vlc' ? '#FFFBEB' : '#FFFFFF'}
              stroke={highlightedRoomId === 'mezzanine-vlc' || destinationRoomId === 'mezzanine-vlc' ? '#B45309' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'mezzanine-vlc' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#B45309" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">VLC-01</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Virtual Learning Centr</text>
            <text x={307.5} y={208} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">e</text>

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#B45309" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#B45309" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor G: Auto-generated Blueprint
  if (floorCode === 'G') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 506" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-G" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-G" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="476" rx="10" fill="url(#grid-G)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="476" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#16A34A" opacity="0.12" />
          <text x="225" y="40" fill="#16A34A" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR G â€” MAIN ENTRANCE</text>

          {/* Room 1: Admission Hall */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'ground-admission' || destinationRoomId === 'ground-admission' ? '#F0FDF4' : '#FFFFFF'}
              stroke={highlightedRoomId === 'ground-admission' || destinationRoomId === 'ground-admission' ? '#16A34A' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'ground-admission' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#16A34A" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">ADM-01</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Admission Hall</text>
            

          </g>
          {/* Room 2: Cafeteria */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'ground-cafe' || destinationRoomId === 'ground-cafe' ? '#F0FDF4' : '#FFFFFF'}
              stroke={highlightedRoomId === 'ground-cafe' || destinationRoomId === 'ground-cafe' ? '#16A34A' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'ground-cafe' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#16A34A" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">CAFE-G</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Cafeteria</text>
            

          </g>
          {/* Room 3: Reception */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'ground-reception' || destinationRoomId === 'ground-reception' ? '#F0FDF4' : '#FFFFFF'}
              stroke={highlightedRoomId === 'ground-reception' || destinationRoomId === 'ground-reception' ? '#16A34A' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'ground-reception' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#16A34A" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">REC-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Reception</text>
            

          </g>
          {/* Room 4: Visitor Lounge */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[3])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'ground-visitor' || destinationRoomId === 'ground-visitor' ? '#F0FDF4' : '#FFFFFF'}
              stroke={highlightedRoomId === 'ground-visitor' || destinationRoomId === 'ground-visitor' ? '#16A34A' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'ground-visitor' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={174} fill="#16A34A" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">VIS-01</text>
            <text x={307.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Visitor Lounge</text>
            

          </g>
          {/* Room 5: Student Info Centre */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[4])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={249}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'ground-info' || destinationRoomId === 'ground-info' ? '#F0FDF4' : '#FFFFFF'}
              stroke={highlightedRoomId === 'ground-info' || destinationRoomId === 'ground-info' ? '#16A34A' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'ground-info' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={271} fill="#16A34A" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">INFO-01</text>
            <text x={142.5} y={289} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Student Info Centre</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="384" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="356" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="370" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="386" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="356" r="10" fill="#16A34A" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="356" r="5" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Floor B1: Auto-generated Blueprint
  if (floorCode === 'B1') {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center p-2 relative select-none">
        <svg viewBox="0 0 450 409" className="w-full h-full max-h-[560px] drop-shadow-sm font-sans">
          <defs>
            <pattern id="grid-B1" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
            <filter id="glow-B1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Floor background grid */}
          <rect x="40" y="20" width="370" height="379" rx="10" fill="url(#grid-B1)" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="40" y="20" width="370" height="379" rx="10" fill="rgba(248,250,252,0.5)" stroke="none" />

          {/* Floor label banner */}
          <rect x="40" y="20" width="370" height="30" rx="10" fill="#475569" opacity="0.12" />
          <text x="225" y="40" fill="#475569" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">FLOOR B1 â€” PARKING (B1/B2)</text>

          {/* Room 1: Basement Parking B1 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[0])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'basement-parking1' || destinationRoomId === 'basement-parking1' ? '#F8FAFC' : '#FFFFFF'}
              stroke={highlightedRoomId === 'basement-parking1' || destinationRoomId === 'basement-parking1' ? '#475569' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'basement-parking1' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={77} fill="#475569" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">PARK-B1</text>
            <text x={142.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Basement Parking B1</text>
            

          </g>
          {/* Room 2: Basement Parking B2 */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[1])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={230}
              y={55}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'basement-parking2' || destinationRoomId === 'basement-parking2' ? '#F8FAFC' : '#FFFFFF'}
              stroke={highlightedRoomId === 'basement-parking2' || destinationRoomId === 'basement-parking2' ? '#475569' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'basement-parking2' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={307.5} y={77} fill="#475569" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">PARK-B2</text>
            <text x={307.5} y={95} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Basement Parking B2</text>
            

          </g>
          {/* Room 3: Security Booth */}
          <g
            onClick={() => onRoomClick(currentFloor.rooms[2])}
            className="cursor-pointer group transition-all duration-200"
          >
            <rect
              x={65}
              y={152}
              width={155}
              height={85}
              rx="6"
              fill={highlightedRoomId === 'basement-security' || destinationRoomId === 'basement-security' ? '#F8FAFC' : '#FFFFFF'}
              stroke={highlightedRoomId === 'basement-security' || destinationRoomId === 'basement-security' ? '#475569' : '#CBD5E1'}
              strokeWidth={destinationRoomId === 'basement-security' ? '2.5' : '1.5'}
              className="group-hover:opacity-90 transition-colors"
            />
            <text x={142.5} y={174} fill="#475569" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">SEC-01</text>
            <text x={142.5} y={192} fill="#0F172A" fontSize="11.5" fontWeight="700" textAnchor="middle">Security Booth</text>
            

          </g>

          {/* Elevator */}
          <g className="cursor-pointer">
            <rect x="65" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="92" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">ELEVATOR</text>
            <text x="92" y="287" fill="#94A3B8" fontSize="16" textAnchor="middle">â¬</text>
          </g>

          {/* Staircase */}
          <g className="cursor-pointer">
            <rect x="140" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="167" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">STAIRS</text>
            <text x="167" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">â‰¡</text>
          </g>

          {/* Restroom */}
          <g className="cursor-pointer">
            <rect x="345" y="259" width="55" height="40" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="372" y="273" fill="#64748B" fontSize="8.5" fontWeight="700" textAnchor="middle">WC</text>
            <text x="372" y="289" fill="#94A3B8" fontSize="13" textAnchor="middle">ðŸš»</text>
          </g>

          {/* Route overlay */}
          {showRoute && (
            <g>
              <circle cx="92" cy="259" r="10" fill="#475569" opacity="0.25" className="animate-pulse" />
              <circle cx="92" cy="259" r="5" fill="#475569" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full min-h-[420px] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
        <div className={`w-16 h-16 rounded-2xl ${currentFloor.bgColor} ${currentFloor.textColor} flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-sm`}>
          {currentFloor.code}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-1">{currentFloor.title}</h3>
        <p className="text-xs text-slate-600 mb-5 leading-relaxed">{currentFloor.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {currentFloor.rooms.map((rm) => (
            <div
              key={rm.id}
              onClick={() => onRoomClick(rm)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-colors"
            >
              <span className="text-[10px] font-extrabold text-primary-600">{rm.code}</span>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{rm.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
