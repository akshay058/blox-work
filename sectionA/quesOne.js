// You are given cartesian coordinates of n factories in a plane producing some items
// that need to be stored in a warehouse.
// a. A transport truck begins its journey from the warehouse and it can travel
// along any horizontal or vertical line. After collecting items from a factory, the
// truck needs to return to the warehouse and deposit the items before visiting
// another factory. Find the strategic location of the warehouse such that the
// total distance truck needs to travel in order to collect items from all the
// factories is minimised.
// b. Think of the plane as a grid (with m x m cells) where a factory or warehouse
// will be a cell. The truck can again travel from one cell to another adjacent cell
// vertically or horizontally except it can’t travel outside the grid boundary.
// Additionally certain cells represent no trespass area where the truck can’t
// pass through. Find the optimum solution in this setup again minimising total
// distance travelled by the truck.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function distance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

// Part A: Find the strategic location of the warehouse
function findWarehouseLocation(factories) {
  let minTotalDistance = Number.MAX_VALUE;
  let warehouseLocation = factories[0]; // Initialize warehouse location to the first factory

  // Try all factories as warehouse locations
  for (let i = 0; i < factories.length; i++) {
    const warehouseCandidate = factories[i];
    let totalDistance = 0;

    // Calculate the total distance for the current warehouse candidate
    for (let j = 0; j < factories.length; j++) {
      const factory = factories[j];
      totalDistance += distance(warehouseCandidate, factory) * 2; // Round-trip distance
    }

    if (totalDistance < minTotalDistance) {
      minTotalDistance = totalDistance;
      warehouseLocation = warehouseCandidate;
    }
  }

  return warehouseLocation;
}

// Part B: Find the optimum solution with the grid and no trespass cells (Brute-Force Approach)
function minimizeTotalDistance(distanceMatrix, factories, noTrespassCells) {
  let minTotalDistance = Number.MAX_VALUE;

  // Recursive function to explore all possible combinations of factories in the grid
  function exploreCombinations(currentIndex, currentDistance) {
    if (currentIndex === factories.length) {
      // Base case: All factories have been explored
      minTotalDistance = Math.min(minTotalDistance, currentDistance);
      return;
    }

    const currentFactory = factories[currentIndex];
    for (const nextFactory of factories) {
      if (
        currentIndex === 0 ||
        isValidMove(currentFactory, nextFactory, noTrespassCells)
      ) {
        const distanceToNextFactory =
          distanceMatrix[currentIndex][factories.indexOf(nextFactory)];
        const updatedDistance = currentDistance + distanceToNextFactory * 2; // Round-trip distance
        exploreCombinations(currentIndex + 1, updatedDistance);
      }
    }
  }

  // Helper function to check if moving to the next factory is valid (no trespass cells)
  function isValidMove(currentFactory, nextFactory, noTrespassCells) {
    for (const cell of noTrespassCells) {
      if (
        (currentFactory.x === cell.x &&
          nextFactory.x === cell.x &&
          cell.y >= Math.min(currentFactory.y, nextFactory.y) &&
          cell.y <= Math.max(currentFactory.y, nextFactory.y)) ||
        (currentFactory.y === cell.y &&
          nextFactory.y === cell.y &&
          cell.x >= Math.min(currentFactory.x, nextFactory.x) &&
          cell.x <= Math.max(currentFactory.x, nextFactory.x))
      ) {
        return false;
      }
    }
    return true;
  }

  // Start exploring combinations from the first factory
  exploreCombinations(0, 0);
  return minTotalDistance;
}

// Example input: A list of factories represented as Point objects
const factories = [
  new Point(1, 2),
  new Point(3, 5),
  new Point(6, 4),
  new Point(8, 3),
];

// Part A: Find the strategic warehouse location
const warehouseLocation = findWarehouseLocation(factories);
console.log("Strategic Warehouse Location:", warehouseLocation);

// Part B: Find the optimum solution with the distance matrix and no trespass cells (Small grid example)
const distanceMatrix = [
  [2, 4, 1, 3], // Distance between Factory 1 and all factories
  [3, 1, 5, 2], // Distance between Factory 2 and all factories
  [5, 2, 7, 1], // Distance between Factory 3 and all factories
  [6, 3, 2, 8], // Distance between Factory 4 and all factories
];

const noTrespassCells = [new Point(2, 3), new Point(3, 3)];

const totalDistance = minimizeTotalDistance(
  distanceMatrix,
  factories,
  noTrespassCells
);
console.log("Minimized Total Distance:", totalDistance);

// Time Complexity in both worst and Average case is O(n)^3
