// Recall the definition of a convex point set [1] in two dimensions. A half convex point
// set is a special case where the point set is convex consisting of at most two
// monotonic sequences. A monotonic sequence is a set of points such that
// coordinates of the points are increasing/decreasing along both the axes. Note that
// coordinate values might increase along one axis and decrease along another one.
// A unit distance pair is a pair of two points iff the distance between both the points is
// exactly one. Implement the code to compute all the unit distance pairs in a given
// half convex point set. Argue an upper bound on the number of such pairs.
// a. Input: A list of tuples where each tuple indicates a point with both coordinate
// values.
// b. Output: A list of pairs of tuples with unit distance.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function distance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function findUnitDistancePairs(points) {
  const n = points.length;
  const unitDistancePairs = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (distance(points[i], points[j]) === 1) {
        unitDistancePairs.push([points[i], points[j]]);
      }
    }
  }

  return unitDistancePairs;
}

// Example input: A list of points represented as tuples
const points = [
  new Point(1, 2),
  new Point(3, 4),
  new Point(4, 4),
  new Point(6, 3),
  new Point(1, 2),
];

// Find all unit distance pairs in the given half convex point set
const unitDistancePairs = findUnitDistancePairs(points);

if (unitDistancePairs.length === 0) {
  console.log("No unit distance pairs found.");
} else {
  console.log("Unit Distance Pairs:");
  unitDistancePairs.forEach((pair) => {
    console.log(`[${pair[0].x},${pair[0].y}] - [${pair[1].x},${pair[1].y}]`);
  });
}
