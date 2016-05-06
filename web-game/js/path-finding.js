loader.addModule('pathFinding', function () {
	function _getKey(object) {
		return object.x + '-' + object.y;
	}

	function heuristic(a, b) {
		// Manhattan distance on a square grid
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}

	function getPath(cameFrom, start, end) {
		var current = end,
			path = [current];
		while (current != start) {
			current = cameFrom[_getKey(current)];
			path.push(current);
		}
		path.reverse();
		return path;
	}

	var PathFinding = {
		astar: function (grid, start, end) {
			// @TODO @XXX Fix implementation, too slow
			var cameFrom = {},
				costSoFar = {},
				current,
				frontier,
				neighbours,
				next,
				nextKey,
				newCost;

			frontier = new HeapQueue(function(a, b) {
				return a.priority - b.priority;
			});

			start.priority = 0;

			frontier.push(start);
			cameFrom[_getKey(start)] = null;
			costSoFar[_getKey(start)] = 0;

			while (frontier.length > 0) {
				current = frontier.pop();

				if (current == end) {
					break;
				}

				neighbours = grid.getNeighbours(current);
				for (next in neighbours) {
					nextKey = _getKey(neighbours[next]);
					newCost = costSoFar[_getKey(current)] + 1;
					if (!(nextKey in costSoFar) || newCost < costSoFar[nextKey]) {
						costSoFar[nextKey] = newCost;
						next.priority = newCost + heuristic(end, neighbours[next]);
						frontier.push(neighbours[next]);
						cameFrom[nextKey] = current;
					}
				}
			}

			return getPath(cameFrom, start, end);
		}
	};

	return PathFinding;
});
