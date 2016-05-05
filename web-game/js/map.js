loader.addModule('map', 'sprites', 'canvas', function (sprites, canvas) {
	"use strict";

	var canvasContext = canvas.getContext(),
		relativeTopCornerTile;

	function Map (m, walkables, gridCellsDimensions) {
		this.map = m;
		this.walkables = walkables;
		this.gridCellsDimensions = gridCellsDimensions;
		relativeTopCornerTile = {
			x: gridCellsDimensions.w / 2,
			y: gridCellsDimensions.h / 2
		};
		this.mapSize = {
			// assumes square map
			w: m.length * gridCellsDimensions.w,
			h: m.length * gridCellsDimensions.h
		};

		this.objects = {};

		this.frame = 0;
		this.tick = 0;
		this.timePerFrame = 16;
		this.maxFrame = 2;

		this.images = new Array(this.maxFrame);
	}

	Map.prototype.getObject = function (coords) {
		return this.objects[coords.x + '-' + coords.y];
	};

	Map.prototype.addObject = function (object, coords) {
		this.objects[coords.x + '-' + coords.y] = object;
	};

	Map.prototype.moveObject = function (from, to) {
		var fromIndex = from.x + '-' + from.y,
			toIndex = to.x + '-' + to.y;

		if (fromIndex !== toIndex) {
			this.objects[toIndex] = this.objects[fromIndex];
			delete this.objects[fromIndex];
		}
	};

	/**
	* Convert a set of pixels in the map projection and returns the coordinates
	* of the cell in the grid
	*/
	Map.prototype.pixelsToCoords = function (x, y) {
		var midTileW = this.gridCellsDimensions.w/2,
			midTileH = this.gridCellsDimensions.h/2,
			coordX = (x / midTileW + y / midTileH) /2 - this.map.length / 2,
			coordY = (y / midTileH - x / midTileW) /2 + this.map.length / 2;

		return {x: 0|coordX, y: 0|coordY};
	};

	Map.prototype.coordsToPixels = function (x, y) {
		return {
			x: (this.mapSize.w - (y - x) * this.gridCellsDimensions.w) / 2,
			y: (x + y + 1) * this.gridCellsDimensions.h / 2
		};
	};

	Map.prototype.update = function () {
		this.tick++;
		if (this.tick == this.timePerFrame) {
			this.tick = 0;
			this.frame = (this.frame + 1) % this.maxFrame;
		}
	};

	Map.prototype.getNeighbours = function (start) {
		var nUp = this.neighbourAt(start, 'up'),
			nRight = this.neighbourAt(start, 'right'),
			nDown = this.neighbourAt(start, 'down'),
			nLeft = this.neighbourAt(start, 'left'),
			neighbours = [];

		if (nUp) {
			neighbours.push(nUp);
		}
		if (nRight) {
			neighbours.push(nRight);
		}
		if (nDown) {
			neighbours.push(nDown);
		}
		if (nLeft) {
			neighbours.push(nLeft);
		}

		return neighbours;
	};

	Map.prototype.neighbourAt = function (start, direction) {
		function neighbourAtCoord (start, directionVector) {
			var nX = start.x + directionVector.x,
				nY = start.y + directionVector.y,
				neighbour;

			if (nY >= 0 && nY < that.map.length && nX >= 0 && nX < that.map[nY].length) {
				neighbour = that.map[nY][nX];
				if (neighbour !== null && that.walkables[nY][nX]) {
					return {x: nX, y: nY, value: neighbour};
				}
			}

			return null;
		}

		var startValue = this.map[start.y][start.x],
			neighbourDirection = sprites.sprites[startValue].neighbours[direction],
			bottomStairVector, neighbour, vectorToTopStair, topStairneighbour,
			that = this;

		neighbour = neighbourAtCoord(start, neighbourDirection);
		// special case if there is a stair where requested
		if (neighbour === null && direction == 'left') {
			bottomStairVector = sprites
				.sprites[sprites.SPRITES_ACCESS.STAIR]
				.neighbours.right;
			vectorToTopStair = {x: -bottomStairVector.x, y: -bottomStairVector.y};
			topStairneighbour = neighbourAtCoord(start, vectorToTopStair);
			// we are at the bottom of a stair, bring the player there
			if (topStairneighbour && topStairneighbour.value == sprites.SPRITES_ACCESS.STAIR) {
				neighbour = topStairneighbour;
			}
		}

		return neighbour;
	};

	Map.prototype.prerender = function (debug, callback) {
		var c = document.createElement('canvas'),
			ctx = c.getContext('2d');

		c.width = this.gridCellsDimensions.w * (this.map.length + 1);
		c.height = this.gridCellsDimensions.h * (this.map.length + 1);

		var x = 0,
			y = 0, coord,
			level = 0,
			startX = 0,
			max = this.map.length - 1,
			spriteInfo;

		for (var f = 0; f < this.maxFrame; f++) {
			this.images[f] = document.createElement('img');

			x = 0;
			y = 0;
			level = 0;
			startX = 0;

			while (x <= max && y <= max) {
				// where to print the tiles
				coord = this.coordsToPixels(x, y);
				if (this.map[y][x] !== null) {
					spriteInfo = sprites.sprites[this.map[y][x]];
					if (spriteInfo.animation !== undefined) {
						spriteInfo = spriteInfo.animation[f];
					}

					ctx.drawImage(sprites.spriteResource,
						spriteInfo.x, spriteInfo.y,
						spriteInfo.w, spriteInfo.d,
						coord.x - relativeTopCornerTile.x, coord.y - relativeTopCornerTile.y,
						spriteInfo.w, spriteInfo.d
					);

					if (debug) {
						ctx.beginPath();
						ctx.moveTo(coord.x - relativeTopCornerTile.x, coord.y);
						ctx.lineTo(coord.x, coord.y - relativeTopCornerTile.y);
						ctx.lineTo(coord.x + relativeTopCornerTile.x, coord.y);
						ctx.lineTo(coord.x, coord.y + relativeTopCornerTile.y);
						ctx.fillStyle = 'rgba(246, 44, 197, 0.5)';
						ctx.strokeStyle = 'black';
						ctx.fill();
						ctx.stroke();
					}
				}

				// end of a row
				if (x == level) {
					// top half of the map
					if (level < max) {
						level++;
					}
					// bottom half of the map
					else {
						startX++;
					}
					y = level;
					x = startX;
				}
				else {
					y--;
					x++;
				}
			}

			this.images[f].src = c.toDataURL('image/png').replace('image/png', "image/octet-stream");
			this.images[f].onload = callback;
		}
	};

	Map.prototype.draw = function (camera) {
		var coord = camera.adapt({x: 0, y: 0}),
			image = this.images[this.frame],
			obj;

		canvasContext.drawImage(image,
			0, 0,
			image.width, image.height,
			coord.x, coord.y,
			image.width, image.height
		);

		for (obj in this.objects) {
			this.objects[obj].draw(camera);
		}
	};

	return Map;
});
