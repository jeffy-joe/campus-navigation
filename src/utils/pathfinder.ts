import { NAVIGATION_NODES } from '../data/navigationGraph';
import { NavigationNode, NavigationResult, RouteStep } from '../types/campus';

export function findShortestPath(startNodeId: string, destinationNodeId: string): NavigationResult | null {
  const startNode = NAVIGATION_NODES[startNodeId];
  const destNode = NAVIGATION_NODES[destinationNodeId];

  if (!startNode || !destNode) {
    return null;
  }

  if (startNodeId === destinationNodeId) {
    return {
      startNode,
      destinationNode: destNode,
      pathNodes: [startNode],
      steps: [
        {
          stepNumber: 1,
          instruction: `You are already at ${startNode.name}`,
          distanceMeters: 0,
          floorCode: startNode.floorCode,
          floorNumber: startNode.floorNumber,
          nodeType: startNode.type,
          isStart: true,
          isDestination: true,
          iconName: 'MapPin',
        },
      ],
      totalDistanceMeters: 0,
      estimatedMinutes: 0,
      floorsInvolved: [startNode.floorCode],
    };
  }

  const distances: Record<string, number> = {};
  const previous: Record<string, { nodeId: string; instruction?: string; edgeDist: number } | null> = {};
  const unvisited = new Set<string>();

  for (const id in NAVIGATION_NODES) {
    distances[id] = Infinity;
    previous[id] = null;
    unvisited.add(id);
  }

  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    let currentId: string | null = null;
    let smallestDist = Infinity;

    for (const id of unvisited) {
      if (distances[id] < smallestDist) {
        smallestDist = distances[id];
        currentId = id;
      }
    }

    if (!currentId || smallestDist === Infinity) {
      break;
    }

    if (currentId === destinationNodeId) {
      break;
    }

    unvisited.delete(currentId);
    const currentNode = NAVIGATION_NODES[currentId];

    for (const conn of currentNode.connections) {
      if (unvisited.has(conn.targetId)) {
        const alt = distances[currentId] + conn.distance;
        if (alt < distances[conn.targetId]) {
          distances[conn.targetId] = alt;
          previous[conn.targetId] = {
            nodeId: currentId,
            instruction: conn.instruction,
            edgeDist: conn.distance,
          };
        }
      }
    }
  }

  const pathNodeIds: string[] = [];
  let curr: string | null = destinationNodeId;

  while (curr) {
    pathNodeIds.unshift(curr);
    const prevItem: { nodeId: string; instruction?: string; edgeDist: number } | null = curr ? previous[curr] : null;
    curr = prevItem ? prevItem.nodeId : null;
    if (curr === startNodeId) {
      pathNodeIds.unshift(startNodeId);
      break;
    }
  }

  if (pathNodeIds[0] !== startNodeId) {
    return createSimulatedPath(startNode, destNode);
  }

  const pathNodes = pathNodeIds.map((id) => NAVIGATION_NODES[id]);
  const steps: RouteStep[] = [];
  const floorsInvolved = Array.from(new Set(pathNodes.map((n) => n.floorCode)));

  steps.push({
    stepNumber: 1,
    instruction: `Start at ${startNode.name}`,
    subText: `Floor ${startNode.floorCode} - Start Point`,
    distanceMeters: 0,
    floorCode: startNode.floorCode,
    floorNumber: startNode.floorNumber,
    nodeType: startNode.type,
    isStart: true,
    iconName: 'Navigation',
  });

  let totalDist = 0;

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const fromNode = pathNodes[i];
    const toNode = pathNodes[i + 1];
    const conn = fromNode.connections.find((c) => c.targetId === toNode.id);
    const stepDist = conn?.distance || 20;
    totalDist += stepDist;

    let instruction = conn?.instruction;
    let iconName = 'ArrowRight';

    if (!instruction) {
      if (toNode.floorCode !== fromNode.floorCode) {
        instruction = `Take the ${toNode.type === 'elevator' ? 'Elevator' : 'Stairs'} to Floor ${toNode.floorCode}`;
        iconName = 'Layers';
      } else {
        instruction = `Walk towards ${toNode.name}`;
      }
    }

    if (toNode.id === destinationNodeId) {
      steps.push({
        stepNumber: steps.length + 1,
        instruction: instruction,
        subText: `After ${stepDist} m`,
        distanceMeters: stepDist,
        floorCode: toNode.floorCode,
        floorNumber: toNode.floorNumber,
        nodeType: toNode.type,
        iconName: 'CornerDownRight',
      });

      steps.push({
        stepNumber: steps.length + 1,
        instruction: `${destNode.name}`,
        subText: `Floor ${destNode.floorCode} - Your Destination`,
        distanceMeters: 0,
        floorCode: destNode.floorCode,
        floorNumber: destNode.floorNumber,
        nodeType: destNode.type,
        isDestination: true,
        iconName: 'MapPin',
      });
    } else {
      steps.push({
        stepNumber: steps.length + 1,
        instruction: instruction,
        subText: `After ${stepDist} m`,
        distanceMeters: stepDist,
        floorCode: toNode.floorCode,
        floorNumber: toNode.floorNumber,
        nodeType: toNode.type,
        iconName: fromNode.floorCode !== toNode.floorCode ? 'Layers' : 'ArrowUpRight',
      });
    }
  }

  const floorChangeCount = Math.abs(destNode.floorNumber - startNode.floorNumber);
  const estimatedMinutes = Math.max(1, Math.round(totalDist / 70 + floorChangeCount * 0.5));

  return {
    startNode,
    destinationNode: destNode,
    pathNodes,
    steps,
    totalDistanceMeters: totalDist,
    estimatedMinutes,
    floorsInvolved,
  };
}

function createSimulatedPath(startNode: NavigationNode, destNode: NavigationNode): NavigationResult {
  const floorDiff = Math.abs(destNode.floorNumber - startNode.floorNumber);
  const estDistance = 140 + floorDiff * 30;
  const estimatedMinutes = Math.max(2, Math.round(estDistance / 70));

  const steps: RouteStep[] = [
    {
      stepNumber: 1,
      instruction: `Start at ${startNode.name}`,
      subText: `Floor ${startNode.floorCode} - Start Point`,
      distanceMeters: 0,
      floorCode: startNode.floorCode,
      floorNumber: startNode.floorNumber,
      nodeType: startNode.type,
      isStart: true,
      iconName: 'Navigation',
    },
    {
      stepNumber: 2,
      instruction: 'Head towards the Central Elevator Bank',
      subText: 'Main Corridor',
      distanceMeters: 30,
      floorCode: startNode.floorCode,
      floorNumber: startNode.floorNumber,
      nodeType: 'corridor',
      iconName: 'ArrowUp',
    },
  ];

  if (startNode.floorCode !== destNode.floorCode) {
    steps.push({
      stepNumber: 3,
      instruction: `Take the Elevator to Floor ${destNode.floorCode}`,
      subText: `Vertical travel to Floor ${destNode.floorCode}`,
      distanceMeters: floorDiff * 25,
      floorCode: destNode.floorCode,
      floorNumber: destNode.floorNumber,
      nodeType: 'elevator',
      iconName: 'Layers',
    });
  }

  steps.push({
    stepNumber: steps.length + 1,
    instruction: `Follow corridor signage to ${destNode.name}`,
    subText: 'After exiting elevator',
    distanceMeters: 25,
    floorCode: destNode.floorCode,
    floorNumber: destNode.floorNumber,
    nodeType: 'corridor',
    iconName: 'CornerDownRight',
  });

  steps.push({
    stepNumber: steps.length + 1,
    instruction: destNode.name,
    subText: `Floor ${destNode.floorCode} - Your Destination`,
    distanceMeters: 0,
    floorCode: destNode.floorCode,
    floorNumber: destNode.floorNumber,
    nodeType: destNode.type,
    isDestination: true,
    iconName: 'MapPin',
  });

  return {
    startNode,
    destinationNode: destNode,
    pathNodes: [startNode, destNode],
    steps,
    totalDistanceMeters: estDistance,
    estimatedMinutes,
    floorsInvolved: [startNode.floorCode, destNode.floorCode],
  };
}
