export type CategoryType = 
  | 'library'
  | 'canteen'
  | 'auditorium'
  | 'admin'
  | 'labs'
  | 'classrooms'
  | 'sports'
  | 'aviation'
  | 'mba'
  | 'bca'
  | 'bcom'
  | 'bsc'
  | 'mca'
  | 'faculty'
  | 'restroom'
  | 'elevator'
  | 'stairs'
  | 'parking'
  | 'gate';

export interface Room {
  id: string;
  name: string;
  code: string;
  floorCode: string; // 'T', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'M', 'G', 'B1'
  floorNumber: number;
  category: CategoryType;
  description: string;
  capacity?: number;
  currentStatus?: 'Open' | 'Class in Session' | 'Available' | 'Occupied' | 'Maintenance';
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  tags: string[];
  isNavigable: boolean;
  facilities?: string[];
  department?: string;
}

export interface Floor {
  id: string;
  code: string; // 'T', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'M', 'G', 'B1'
  number: number; // For ordering
  name: string;
  title: string;
  subtitle: string;
  categorySummary: string[];
  icon: string;
  colorBadge: string;
  bgColor: string;
  textColor: string;
  description: string;
  rooms: Room[];
}

export interface NavigationNode {
  id: string;
  name: string;
  floorCode: string;
  floorNumber: number;
  x: number;
  y: number;
  type: 'room' | 'corridor' | 'stair' | 'elevator' | 'entrance' | 'gate' | 'parking';
  connections: {
    targetId: string;
    distance: number; // meters
    instruction?: string;
  }[];
}

export interface RouteStep {
  stepNumber: number;
  instruction: string;
  subText?: string;
  distanceMeters: number;
  floorCode: string;
  floorNumber: number;
  nodeType: NavigationNode['type'];
  isStart?: boolean;
  isDestination?: boolean;
  iconName: string;
}

export interface NavigationResult {
  startNode: NavigationNode;
  destinationNode: NavigationNode;
  pathNodes: NavigationNode[];
  steps: RouteStep[];
  totalDistanceMeters: number;
  estimatedMinutes: number;
  floorsInvolved: string[];
}

export interface RecentLocation {
  id: string;
  name: string;
  roomCode?: string;
  floorName: string;
  floorCode: string;
  floorNumber: number;
  category: CategoryType;
  lastVisited: string;
}

export interface QuickCategory {
  id: CategoryType;
  name: string;
  icon: string;
  bgLight: string;
  textColor: string;
  accentColor: string;
  count: number;
}
