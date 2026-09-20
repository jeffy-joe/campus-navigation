import { NavigationNode } from '../types/campus';

export const NAVIGATION_NODES: Record<string, NavigationNode> = {
  // === BASEMENT ===
  'node-parking-b1': {
    id: 'node-parking-b1',
    name: 'Basement Parking (B1/B2)',
    floorCode: 'B1',
    floorNumber: -1,
    x: 200,
    y: 150,
    type: 'parking',
    connections: [
      { targetId: 'node-elevator-b', distance: 20, instruction: 'Walk to Basement Elevator Bank' },
      { targetId: 'node-stairs-b', distance: 25, instruction: 'Head towards Basement Stairwell' }
    ]
  },
  'node-elevator-b': {
    id: 'node-elevator-b',
    name: 'Elevator (Basement)',
    floorCode: 'B1',
    floorNumber: -1,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-parking-b1', distance: 20, instruction: 'Step out into Parking Bay' },
      { targetId: 'node-elevator-g', distance: 15, instruction: 'Take Elevator up to Ground Floor' },
      { targetId: 'node-elevator-m', distance: 25, instruction: 'Take Elevator up to Mezzanine Library' },
      { targetId: 'node-elevator-4', distance: 50, instruction: 'Take Elevator up to Floor 4 (AI / Tech Labs)' },
      { targetId: 'node-elevator-7', distance: 75, instruction: 'Take Elevator up to Floor 7 (Aviation Labs)' },
      { targetId: 'node-elevator-t', distance: 120, instruction: 'Take Elevator up to Terrace (Sports & Cafe)' }
    ]
  },
  'node-stairs-b': {
    id: 'node-stairs-b',
    name: 'Stairs (Basement)',
    floorCode: 'B1',
    floorNumber: -1,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-g', distance: 25, instruction: 'Walk up stairs to Ground Floor' }
    ]
  },

  // === GROUND FLOOR ===
  'node-reception-g': {
    id: 'node-reception-g',
    name: 'Main Reception & Security Desk',
    floorCode: 'G',
    floorNumber: 0,
    x: 100,
    y: 100,
    type: 'gate',
    connections: [
      { targetId: 'node-admission-hall-g', distance: 20, instruction: 'Walk right towards Admission Hall' },
      { targetId: 'node-cafeteria-g', distance: 30, instruction: 'Turn left towards Ground Floor Cafeteria' },
      { targetId: 'node-elevator-g', distance: 20, instruction: 'Proceed straight to Central Elevator Bank' }
    ]
  },
  'node-admission-hall-g': {
    id: 'node-admission-hall-g',
    name: 'Admission Hall & Counseling',
    floorCode: 'G',
    floorNumber: 0,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-reception-g', distance: 20, instruction: 'Walk back to Main Reception' },
      { targetId: 'node-visitor-lounge-g', distance: 25, instruction: 'Walk towards Visitor Lounge' },
      { targetId: 'node-elevator-g', distance: 20, instruction: 'Proceed towards Elevator Bank' }
    ]
  },
  'node-cafeteria-g': {
    id: 'node-cafeteria-g',
    name: 'Ground Floor Cafeteria',
    floorCode: 'G',
    floorNumber: 0,
    x: 100,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-reception-g', distance: 30, instruction: 'Exit Cafeteria to Main Reception Lobby' }
    ]
  },
  'node-visitor-lounge-g': {
    id: 'node-visitor-lounge-g',
    name: 'Visitor Lounge & Student Info Centre',
    floorCode: 'G',
    floorNumber: 0,
    x: 280,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-admission-hall-g', distance: 25, instruction: 'Walk to Admission Hall' },
      { targetId: 'node-elevator-g', distance: 18, instruction: 'Walk to Elevator Bank' }
    ]
  },
  'node-elevator-g': {
    id: 'node-elevator-g',
    name: 'Elevator (Ground Floor)',
    floorCode: 'G',
    floorNumber: 0,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-reception-g', distance: 20, instruction: 'Exit Elevator into Ground Floor Foyer' },
      { targetId: 'node-elevator-m', distance: 15, instruction: 'Take Elevator to Mezzanine Floor (Library)' },
      { targetId: 'node-elevator-1', distance: 20, instruction: 'Take Elevator to Floor 1 (Auditorium)' },
      { targetId: 'node-elevator-2', distance: 30, instruction: 'Take Elevator to Floor 2 (PVC & Accounts)' },
      { targetId: 'node-elevator-3', distance: 40, instruction: 'Take Elevator to Floor 3 (BCA Dept)' },
      { targetId: 'node-elevator-4', distance: 50, instruction: 'Take Elevator to Floor 4 (AI, ML, Cyber Labs)' },
      { targetId: 'node-elevator-5', distance: 60, instruction: 'Take Elevator to Floor 5 (B.Sc & MCA Dept)' },
      { targetId: 'node-elevator-6', distance: 70, instruction: 'Take Elevator to Floor 6 (B.Sc & Cafeteria)' },
      { targetId: 'node-elevator-7', distance: 80, instruction: 'Take Elevator to Floor 7 (Aviation & Simulators)' },
      { targetId: 'node-elevator-8', distance: 90, instruction: 'Take Elevator to Floor 8 (Aviation Dept)' },
      { targetId: 'node-elevator-9', distance: 100, instruction: 'Take Elevator to Floor 9 (B.Com Dept)' },
      { targetId: 'node-elevator-10', distance: 110, instruction: 'Take Elevator to Floor 10 (MBA & Idea Lab)' },
      { targetId: 'node-elevator-11', distance: 120, instruction: 'Take Elevator to Floor 11 (MBA Dept)' },
      { targetId: 'node-elevator-12', distance: 130, instruction: 'Take Elevator to Floor 12 (Chairman Chamber)' },
      { targetId: 'node-elevator-t', distance: 140, instruction: 'Take Elevator to Terrace (Pickleball & Cafe)' }
    ]
  },
  'node-stairs-g': {
    id: 'node-stairs-g',
    name: 'Stairs (Ground Floor)',
    floorCode: 'G',
    floorNumber: 0,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-m', distance: 20, instruction: 'Walk up stairs to Mezzanine Library' }
    ]
  },

  // === MEZZANINE FLOOR (M) ===
  'node-elevator-m': {
    id: 'node-elevator-m',
    name: 'Elevator (Floor M)',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-central-library-m', distance: 15, instruction: 'Turn left into Central Library' },
      { targetId: 'node-digital-library-m', distance: 15, instruction: 'Turn right into Digital Library' },
      { targetId: 'node-reprography-m', distance: 20, instruction: 'Walk towards Reprography Center' },
      { targetId: 'node-elevator-g', distance: 15, instruction: 'Take Elevator down to Ground Floor' },
      { targetId: 'node-elevator-4', distance: 40, instruction: 'Take Elevator up to Floor 4' }
    ]
  },
  'node-stairs-m': {
    id: 'node-stairs-m',
    name: 'Stairs (Floor M)',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-g', distance: 20, instruction: 'Walk down stairs to Ground Floor' },
      { targetId: 'node-stairs-1', distance: 20, instruction: 'Walk up stairs to Floor 1' }
    ]
  },
  'node-central-library-m': {
    id: 'node-central-library-m',
    name: 'Central Library (Stacks & Reading Hall)',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 100,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-m', distance: 15, instruction: 'Exit Library towards Elevator' }
    ]
  },
  'node-digital-library-m': {
    id: 'node-digital-library-m',
    name: 'Digital Library & E-Journals',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-m', distance: 15, instruction: 'Exit Digital Library to Elevator' }
    ]
  },
  'node-reprography-m': {
    id: 'node-reprography-m',
    name: 'Reprography & Printing Centre',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 100,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-m', distance: 20, instruction: 'Exit Reprography Center' }
    ]
  },
  'node-virtual-learning-m': {
    id: 'node-virtual-learning-m',
    name: 'Virtual Learning Centre',
    floorCode: 'M',
    floorNumber: 0.5,
    x: 280,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-m', distance: 20, instruction: 'Exit Virtual Learning Centre' }
    ]
  },

  // === FLOOR 1 ===
  'node-elevator-1': {
    id: 'node-elevator-1',
    name: 'Elevator (Floor 1)',
    floorCode: '1',
    floorNumber: 1,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-auditorium-1', distance: 20, instruction: 'Walk left towards Main Auditorium Entrance' },
      { targetId: 'node-iqac-room', distance: 18, instruction: 'Walk right into IQAC Room' },
      { targetId: 'node-elevator-g', distance: 20, instruction: 'Take Elevator down to Ground Floor' }
    ]
  },
  'node-stairs-1': {
    id: 'node-stairs-1',
    name: 'Stairs (Floor 1)',
    floorCode: '1',
    floorNumber: 1,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-m', distance: 20, instruction: 'Walk down to Mezzanine Library' },
      { targetId: 'node-stairs-2', distance: 20, instruction: 'Walk up to Floor 2' }
    ]
  },
  'node-auditorium-1': {
    id: 'node-auditorium-1',
    name: 'Grand Auditorium (Main Tier)',
    floorCode: '1',
    floorNumber: 1,
    x: 120,
    y: 120,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-1', distance: 20, instruction: 'Exit Auditorium towards Floor 1 Elevator' }
    ]
  },
  'node-iqac-room': {
    id: 'node-iqac-room',
    name: 'IQAC Room (Quality Assurance)',
    floorCode: '1',
    floorNumber: 1,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-1', distance: 18, instruction: 'Exit IQAC Room' }
    ]
  },
  'node-vip-lounge-1': {
    id: 'node-vip-lounge-1',
    name: 'VIP Lounge & Guest Suite',
    floorCode: '1',
    floorNumber: 1,
    x: 280,
    y: 180,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-1', distance: 18, instruction: 'Exit VIP Lounge' }
    ]
  },

  // === FLOOR 2 ===
  'node-elevator-2': {
    id: 'node-elevator-2',
    name: 'Elevator (Floor 2)',
    floorCode: '2',
    floorNumber: 2,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-pvc-office', distance: 15, instruction: 'Turn left to Pro Vice Chancellor Chamber' },
      { targetId: 'node-accounts-admin', distance: 18, instruction: 'Turn right to Accounts & Admin Office' },
      { targetId: 'node-infirmary', distance: 22, instruction: 'Walk towards Infirmary (Health Clinic)' },
      { targetId: 'node-indoor-gym', distance: 25, instruction: 'Walk towards Gym & Indoor Games' }
    ]
  },
  'node-stairs-2': {
    id: 'node-stairs-2',
    name: 'Stairs (Floor 2)',
    floorCode: '2',
    floorNumber: 2,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-1', distance: 20, instruction: 'Walk down to Floor 1' },
      { targetId: 'node-stairs-3', distance: 20, instruction: 'Walk up to Floor 3' }
    ]
  },
  'node-pvc-office': {
    id: 'node-pvc-office',
    name: 'Pro Vice Chancellor Chamber',
    floorCode: '2',
    floorNumber: 2,
    x: 100,
    y: 90,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-2', distance: 15, instruction: 'Exit PVC Chamber to Elevator' }
    ]
  },
  'node-accounts-admin': {
    id: 'node-accounts-admin',
    name: 'Accounts & Administration Office',
    floorCode: '2',
    floorNumber: 2,
    x: 280,
    y: 90,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-2', distance: 18, instruction: 'Exit Accounts to Elevator' }
    ]
  },
  'node-infirmary': {
    id: 'node-infirmary',
    name: 'Infirmary & Health Clinic',
    floorCode: '2',
    floorNumber: 2,
    x: 100,
    y: 200,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-2', distance: 22, instruction: 'Exit Infirmary to Corridor' }
    ]
  },
  'node-indoor-gym': {
    id: 'node-indoor-gym',
    name: 'Gym & Indoor Games Room',
    floorCode: '2',
    floorNumber: 2,
    x: 280,
    y: 200,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-2', distance: 25, instruction: 'Exit Gym to Elevator' }
    ]
  },
  'node-student-clubs': {
    id: 'node-student-clubs',
    name: 'Student Clubs & Activities Hub',
    floorCode: '2',
    floorNumber: 2,
    x: 200,
    y: 310,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-2', distance: 25, instruction: 'Exit Student Clubs to Elevator' }
    ]
  },

  // === FLOOR 3 ===
  'node-elevator-3': {
    id: 'node-elevator-3',
    name: 'Elevator (Floor 3)',
    floorCode: '3',
    floorNumber: 3,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-bca-dept', distance: 18, instruction: 'Step directly into BCA Department & Software Labs' }
    ]
  },
  'node-stairs-3': {
    id: 'node-stairs-3',
    name: 'Stairs (Floor 3)',
    floorCode: '3',
    floorNumber: 3,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-2', distance: 20, instruction: 'Walk down to Floor 2' },
      { targetId: 'node-stairs-4', distance: 20, instruction: 'Walk up to Floor 4' }
    ]
  },
  'node-bca-dept': {
    id: 'node-bca-dept',
    name: 'BCA Department & Software Labs',
    floorCode: '3',
    floorNumber: 3,
    x: 200,
    y: 140,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-3', distance: 18, instruction: 'Exit BCA Department to Elevator' }
    ]
  },

  // === FLOOR 4 (FLAGSHIP AI & TECH LABS) ===
  'node-elevator-4': {
    id: 'node-elevator-4',
    name: 'Elevator (Floor 4)',
    floorCode: '4',
    floorNumber: 4,
    x: 208,
    y: 280,
    type: 'elevator',
    connections: [
      { targetId: 'node-corridor-center-4', distance: 12, instruction: 'Turn left after exiting elevator into Floor 4 Central Corridor' }
    ]
  },
  'node-stairs-4': {
    id: 'node-stairs-4',
    name: 'Stairs (Floor 4)',
    floorCode: '4',
    floorNumber: 4,
    x: 105,
    y: 182,
    type: 'stair',
    connections: [
      { targetId: 'node-corridor-west-4', distance: 10, instruction: 'Step onto Floor 4 West Corridor' },
      { targetId: 'node-stairs-3', distance: 20, instruction: 'Walk down to Floor 3' },
      { targetId: 'node-stairs-5', distance: 20, instruction: 'Walk up to Floor 5' }
    ]
  },
  'node-corridor-west-4': {
    id: 'node-corridor-west-4',
    name: 'West Corridor (Floor 4)',
    floorCode: '4',
    floorNumber: 4,
    x: 145,
    y: 182,
    type: 'corridor',
    connections: [
      { targetId: 'node-stairs-4', distance: 10, instruction: 'Turn left towards Staircase' },
      { targetId: 'node-ai-lab', distance: 20, instruction: 'Turn left into Artificial Intelligence Lab' },
      { targetId: 'node-cyber-lab', distance: 15, instruction: 'Turn right into Cyber Security Lab' },
      { targetId: 'node-corridor-center-4', distance: 35, instruction: 'Proceed east along Central Corridor' }
    ]
  },
  'node-corridor-center-4': {
    id: 'node-corridor-center-4',
    name: 'Central Corridor (Floor 4)',
    floorCode: '4',
    floorNumber: 4,
    x: 208,
    y: 182,
    type: 'corridor',
    connections: [
      { targetId: 'node-corridor-west-4', distance: 35, instruction: 'Walk west towards AI Lab and Stairs' },
      { targetId: 'node-ml-lab', distance: 22, instruction: 'Turn left into Machine Learning Lab' },
      { targetId: 'node-datascience-lab', distance: 18, instruction: 'Turn right into Data Science Lab' },
      { targetId: 'node-elevator-4', distance: 12, instruction: 'Turn right towards Elevator' },
      { targetId: 'node-placement-office', distance: 25, instruction: 'Walk south to Placement Office' }
    ]
  },
  'node-ai-lab': {
    id: 'node-ai-lab',
    name: 'Artificial Intelligence Lab',
    floorCode: '4',
    floorNumber: 4,
    x: 145,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-corridor-west-4', distance: 20, instruction: 'Exit AI Lab into corridor' }
    ]
  },
  'node-ml-lab': {
    id: 'node-ml-lab',
    name: 'Machine Learning Lab',
    floorCode: '4',
    floorNumber: 4,
    x: 295,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-corridor-center-4', distance: 22, instruction: 'Exit ML Lab into corridor' }
    ]
  },
  'node-cyber-lab': {
    id: 'node-cyber-lab',
    name: 'Cyber Security Lab',
    floorCode: '4',
    floorNumber: 4,
    x: 145,
    y: 215,
    type: 'room',
    connections: [
      { targetId: 'node-corridor-west-4', distance: 15, instruction: 'Exit Cyber Security Lab into corridor' }
    ]
  },
  'node-datascience-lab': {
    id: 'node-datascience-lab',
    name: 'Data Science Lab',
    floorCode: '4',
    floorNumber: 4,
    x: 295,
    y: 215,
    type: 'room',
    connections: [
      { targetId: 'node-corridor-center-4', distance: 18, instruction: 'Exit Data Science Lab into corridor' }
    ]
  },
  'node-placement-office': {
    id: 'node-placement-office',
    name: 'Placement Office & Corporate Interview Cell',
    floorCode: '4',
    floorNumber: 4,
    x: 208,
    y: 320,
    type: 'room',
    connections: [
      { targetId: 'node-corridor-center-4', distance: 25, instruction: 'Exit Placement Office into corridor' }
    ]
  },

  // === FLOOR 5 ===
  'node-elevator-5': {
    id: 'node-elevator-5',
    name: 'Elevator (Floor 5)',
    floorCode: '5',
    floorNumber: 5,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-mca-dept', distance: 20, instruction: 'Turn left to MCA Department' },
      { targetId: 'node-bsc-5', distance: 20, instruction: 'Turn right to B.Sc Department' }
    ]
  },
  'node-stairs-5': {
    id: 'node-stairs-5',
    name: 'Stairs (Floor 5)',
    floorCode: '5',
    floorNumber: 5,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-4', distance: 20, instruction: 'Walk down to Floor 4' },
      { targetId: 'node-stairs-6', distance: 20, instruction: 'Walk up to Floor 6' }
    ]
  },
  'node-mca-dept': {
    id: 'node-mca-dept',
    name: 'MCA Department & Advanced Coding Lab',
    floorCode: '5',
    floorNumber: 5,
    x: 100,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-5', distance: 20, instruction: 'Exit MCA Dept to Elevator' }
    ]
  },
  'node-bsc-5': {
    id: 'node-bsc-5',
    name: 'B.Sc. Department Computer Lab',
    floorCode: '5',
    floorNumber: 5,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-5', distance: 20, instruction: 'Exit B.Sc Dept to Elevator' }
    ]
  },
  'node-faculty-5': {
    id: 'node-faculty-5',
    name: 'MCA & Science Faculty Room',
    floorCode: '5',
    floorNumber: 5,
    x: 200,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-5', distance: 15, instruction: 'Exit Faculty Room to Elevator' }
    ]
  },

  // === FLOOR 6 ===
  'node-elevator-6': {
    id: 'node-elevator-6',
    name: 'Elevator (Floor 6)',
    floorCode: '6',
    floorNumber: 6,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-bsc-6', distance: 20, instruction: 'Turn left into B.Sc Department' },
      { targetId: 'node-cafeteria-6', distance: 20, instruction: 'Turn right into Floor 6 Cafeteria' }
    ]
  },
  'node-stairs-6': {
    id: 'node-stairs-6',
    name: 'Stairs (Floor 6)',
    floorCode: '6',
    floorNumber: 6,
    x: 95,
    y: 180,
    type: 'stair',
    connections: [
      { targetId: 'node-stairs-5', distance: 20, instruction: 'Walk down to Floor 5' },
      { targetId: 'node-stairs-7', distance: 20, instruction: 'Walk up to Floor 7' }
    ]
  },
  'node-bsc-6': {
    id: 'node-bsc-6',
    name: 'B.Sc Department Classrooms',
    floorCode: '6',
    floorNumber: 6,
    x: 100,
    y: 120,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-6', distance: 20, instruction: 'Exit B.Sc Classrooms to Elevator' }
    ]
  },
  'node-cafeteria-6': {
    id: 'node-cafeteria-6',
    name: 'Floor 6 Cafeteria',
    floorCode: '6',
    floorNumber: 6,
    x: 280,
    y: 120,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-6', distance: 20, instruction: 'Exit Cafeteria to Elevator' }
    ]
  },

  // === FLOOR 7 ===
  'node-elevator-7': {
    id: 'node-elevator-7',
    name: 'Elevator (Floor 7)',
    floorCode: '7',
    floorNumber: 7,
    x: 220,
    y: 600,
    type: 'elevator',
    connections: [
      { targetId: 'node-slab-12', distance: 35, instruction: 'Walk down central corridor to S-Lab 1&2' },
      { targetId: 'node-s-cr-5', distance: 30, instruction: 'Walk down central corridor to S-Classroom 5' },
      { targetId: 'node-cr-4', distance: 25, instruction: 'Walk down central corridor to Classroom 4' },
      { targetId: 'node-slab-34', distance: 20, instruction: 'Walk down central corridor to S-Lab 3&4' },
      { targetId: 'node-cr-3', distance: 15, instruction: 'Walk along corridor to Classroom 3' },
      { targetId: 'node-s-cr-2', distance: 12, instruction: 'Walk along corridor to S-Classroom 2' },
      { targetId: 'node-s-cr-1', distance: 10, instruction: 'Turn into S.Classroom 1' },
      { targetId: 'node-cr-6', distance: 35, instruction: 'Walk up central corridor to Classroom 6' },
      { targetId: 'node-staff-7', distance: 30, instruction: 'Walk along corridor to Staff Rooms' },
      { targetId: 'node-breakout-7', distance: 15, instruction: 'Walk right into Breakout Space' },
    ]
  },
  'node-stairs-7': {
    id: 'node-stairs-7',
    name: 'Stairs (Floor 7)',
    floorCode: '7',
    floorNumber: 7,
    x: 120,
    y: 350,
    type: 'stair',
    connections: [
      { targetId: 'node-elevator-7', distance: 15, instruction: 'Walk along corridor to Elevator' },
      { targetId: 'node-stairs-6', distance: 20, instruction: 'Walk down to Floor 6' },
      { targetId: 'node-stairs-8', distance: 20, instruction: 'Walk up to Floor 8' }
    ]
  },
  'node-slab-12': {
    id: 'node-slab-12',
    name: 'S-Lab 1&2',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 90,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 35, instruction: 'Exit S-Lab 1&2 into central corridor' }
    ]
  },
  'node-s-cr-5': {
    id: 'node-s-cr-5',
    name: 'S-Classroom 5',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 180,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 30, instruction: 'Exit S-Classroom 5 into central corridor' }
    ]
  },
  'node-cr-4': {
    id: 'node-cr-4',
    name: 'Classroom 4',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 265,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 25, instruction: 'Exit Classroom 4 into central corridor' }
    ]
  },
  'node-slab-34': {
    id: 'node-slab-34',
    name: 'S-Lab 3&4',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 360,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 20, instruction: 'Exit S-Lab 3&4 into central corridor' }
    ]
  },
  'node-cr-3': {
    id: 'node-cr-3',
    name: 'Classroom 3',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 455,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 15, instruction: 'Exit Classroom 3 into central corridor' }
    ]
  },
  'node-s-cr-2': {
    id: 'node-s-cr-2',
    name: 'S-Classroom 2',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 540,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 12, instruction: 'Exit S-Classroom 2 into central corridor' }
    ]
  },
  'node-s-cr-1': {
    id: 'node-s-cr-1',
    name: 'S.Classroom 1',
    floorCode: '7',
    floorNumber: 7,
    x: 325,
    y: 625,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 10, instruction: 'Exit S.Classroom 1 into lobby corridor' }
    ]
  },
  'node-cr-6': {
    id: 'node-cr-6',
    name: 'Classroom 6',
    floorCode: '7',
    floorNumber: 7,
    x: 117,
    y: 90,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 35, instruction: 'Exit Classroom 6 into central corridor' }
    ]
  },
  'node-staff-7': {
    id: 'node-staff-7',
    name: 'Staff Rooms',
    floorCode: '7',
    floorNumber: 7,
    x: 122,
    y: 175,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 30, instruction: 'Exit Staff Rooms into corridor' }
    ]
  },
  'node-breakout-7': {
    id: 'node-breakout-7',
    name: 'Breakout Space',
    floorCode: '7',
    floorNumber: 7,
    x: 122,
    y: 480,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-7', distance: 15, instruction: 'Exit Breakout Space into corridor' }
    ]
  },

  // === FLOOR 8 ===
  'node-elevator-8': {
    id: 'node-elevator-8',
    name: 'Elevator (Floor 8)',
    floorCode: '8',
    floorNumber: 8,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-aviation-8', distance: 18, instruction: 'Step directly into Aviation Department' }
    ]
  },
  'node-aviation-8': {
    id: 'node-aviation-8',
    name: 'Aviation Department (Operations & Cabin Training)',
    floorCode: '8',
    floorNumber: 8,
    x: 200,
    y: 140,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-8', distance: 18, instruction: 'Exit Aviation Dept to Elevator' }
    ]
  },

  // === FLOOR 9 ===
  'node-elevator-9': {
    id: 'node-elevator-9',
    name: 'Elevator (Floor 9)',
    floorCode: '9',
    floorNumber: 9,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-bcom-dept', distance: 18, instruction: 'Step directly into B.Com Department' }
    ]
  },
  'node-bcom-dept': {
    id: 'node-bcom-dept',
    name: 'B.Com Department & Financial Modeling Lab',
    floorCode: '9',
    floorNumber: 9,
    x: 200,
    y: 140,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-9', distance: 18, instruction: 'Exit B.Com Dept to Elevator' }
    ]
  },

  // === FLOOR 10 ===
  'node-elevator-10': {
    id: 'node-elevator-10',
    name: 'Elevator (Floor 10)',
    floorCode: '10',
    floorNumber: 10,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-incubation', distance: 20, instruction: 'Turn left into Startup Incubation Room' },
      { targetId: 'node-idea-lab', distance: 20, instruction: 'Turn right into Idea Lab' }
    ]
  },
  'node-incubation': {
    id: 'node-incubation',
    name: 'Startup Incubation Room',
    floorCode: '10',
    floorNumber: 10,
    x: 100,
    y: 120,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-10', distance: 20, instruction: 'Exit Incubation to Elevator' }
    ]
  },
  'node-idea-lab': {
    id: 'node-idea-lab',
    name: 'Idea Lab',
    floorCode: '10',
    floorNumber: 10,
    x: 280,
    y: 120,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-10', distance: 20, instruction: 'Exit Idea Lab to Elevator' }
    ]
  },

  // === FLOOR 11 ===
  'node-elevator-11': {
    id: 'node-elevator-11',
    name: 'Elevator (Floor 11)',
    floorCode: '11',
    floorNumber: 11,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-mba-dept-11', distance: 18, instruction: 'Step directly into MBA Department' }
    ]
  },
  'node-mba-dept-11': {
    id: 'node-mba-dept-11',
    name: 'MBA Department & Lecture Halls',
    floorCode: '11',
    floorNumber: 11,
    x: 200,
    y: 140,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-11', distance: 18, instruction: 'Exit MBA Dept to Elevator' }
    ]
  },

  // === FLOOR 12 (EXECUTIVE) ===
  'node-elevator-12': {
    id: 'node-elevator-12',
    name: 'Elevator (Floor 12)',
    floorCode: '12',
    floorNumber: 12,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-chairman', distance: 15, instruction: 'Turn left to Chairman Chamber' },
      { targetId: 'node-vels-corp', distance: 18, instruction: 'Turn right to Vels Corp. Office' },
      { targetId: 'node-preview-theatre', distance: 22, instruction: 'Proceed to Preview Theatre' },
      { targetId: 'node-conf-12', distance: 25, instruction: 'Proceed to Conference Hall' }
    ]
  },
  'node-chairman': {
    id: 'node-chairman',
    name: 'Chairman Chamber',
    floorCode: '12',
    floorNumber: 12,
    x: 100,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-12', distance: 15, instruction: 'Exit Chairman Chamber' }
    ]
  },
  'node-vels-corp': {
    id: 'node-vels-corp',
    name: 'Vels Corp. Office',
    floorCode: '12',
    floorNumber: 12,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-12', distance: 18, instruction: 'Exit Vels Corp to Elevator' }
    ]
  },
  'node-preview-theatre': {
    id: 'node-preview-theatre',
    name: 'Preview Theatre',
    floorCode: '12',
    floorNumber: 12,
    x: 100,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-12', distance: 22, instruction: 'Exit Preview Theatre' }
    ]
  },
  'node-conf-12': {
    id: 'node-conf-12',
    name: 'Executive Conference Hall',
    floorCode: '12',
    floorNumber: 12,
    x: 280,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-12', distance: 25, instruction: 'Exit Conference Hall' }
    ]
  },

  // === FLOOR T (TERRACE) ===
  'node-elevator-t': {
    id: 'node-elevator-t',
    name: 'Elevator (Terrace)',
    floorCode: 'T',
    floorNumber: 13,
    x: 200,
    y: 260,
    type: 'elevator',
    connections: [
      { targetId: 'node-pickleball', distance: 18, instruction: 'Turn left to Pickleball Court' },
      { targetId: 'node-futsal', distance: 20, instruction: 'Turn right to Futsal Arena' },
      { targetId: 'node-amphitheatre', distance: 22, instruction: 'Proceed to Rooftop Amphitheatre' },
      { targetId: 'node-terrace-cafe', distance: 25, instruction: 'Walk to Rooftop Café' }
    ]
  },
  'node-pickleball': {
    id: 'node-pickleball',
    name: 'Pickleball Court',
    floorCode: 'T',
    floorNumber: 13,
    x: 100,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-t', distance: 18, instruction: 'Exit Pickleball Court' }
    ]
  },
  'node-futsal': {
    id: 'node-futsal',
    name: 'Futsal Arena',
    floorCode: 'T',
    floorNumber: 13,
    x: 280,
    y: 100,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-t', distance: 20, instruction: 'Exit Futsal Arena' }
    ]
  },
  'node-amphitheatre': {
    id: 'node-amphitheatre',
    name: 'Rooftop Amphitheatre',
    floorCode: 'T',
    floorNumber: 13,
    x: 100,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-t', distance: 22, instruction: 'Exit Amphitheatre' }
    ]
  },
  'node-terrace-cafe': {
    id: 'node-terrace-cafe',
    name: 'Rooftop Café',
    floorCode: 'T',
    floorNumber: 13,
    x: 280,
    y: 220,
    type: 'room',
    connections: [
      { targetId: 'node-elevator-t', distance: 25, instruction: 'Exit Café' }
    ]
  }
};
