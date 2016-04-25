
loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites',
function (B, sky, canvas, sprites) {
	"use strict";

	var canvasContext = canvas.getContext(),
		debug = false,
		n = null,
		m, me,
		map = [
			[0, 0, n, n, n, n, n, n, n, n],
			[0, 2, n, 0, 0, 0, n, n, n, n],
			[0, n, n, 1, 1, 1, 1, 1, 1, 0],
			[n, n, 0, 1, 0, 0, 0, 0, 0, 0],
			[n, 0, 0, 1, 0, n, n, n, n, 0],
			[n, 0, 0, 1, 0, n, 0, 0, n, 0],
			[n, 0, 0, 1, 2, n, 0, 0, n, 0],
			[n, 0, 0, 1, 0, n, 0, 0, n, 0],
			[n, 0, 0, 1, 0, n, n, n, n, 0],
			[n, 0, 0, 1, 0, 0, 0, 0, 0, 0]
		],
		camera,

		gridCellsDimensions = {w: 64, h: 36},
		relativeTopCornerTile = {
			x: gridCellsDimensions.w / 2,
			y: gridCellsDimensions.h / 2
		},

		mapSize = {
			// assumes square map
			w: map.length * gridCellsDimensions.w,
			h: map.length * gridCellsDimensions.h
		};

	camera = {
		x: 320,
		y: 18,
		w: 0,
		h: 0,
		/**
		 * Convert some world coordinates to coordinates in the camera
		 */
		adapt: function (coord) {
			var ret = {
				x: coord.x - (this.x - this.w / 2),
				y: coord.y - (this.y - this.h / 2),
			};
			return ret;
		},
		/**
		 * Convert some camera coordinates to coordinates in the world
		 */
		toWorldCoords: function (coord) {
			var ret = {
				x: coord.x + (this.x - this.w / 2),
				y: coord.y + (this.y - this.h / 2),
			};
			return ret;
		},
		setPosition (coordinates) {
			this.x = coordinates.x;
			this.y = coordinates.y;
		},
		draw: function () {
			canvasContext.strokeStyle = 'black';
			canvasContext.beginPath();
			canvasContext.moveTo(this.w / 2, 0);
			canvasContext.lineTo(this.w / 2, this.h);
			canvasContext.stroke();

			canvasContext.beginPath();
			canvasContext.moveTo(0, this.h / 2);
			canvasContext.lineTo(this.w, this.h / 2);
			canvasContext.stroke();
		}
	};

	function Map (m) {
		this.map = m;
	}

	Map.prototype.pixelsToCoords = function (x, y) {
		var midTileW = gridCellsDimensions.w/2,
			midTileH = gridCellsDimensions.h/2,
			coordX = parseInt((x*midTileH + y*midTileW - (288+midTileW)*midTileH)/1296),
			coordY = parseInt((-x*midTileH + y*midTileW + (288+midTileW)*midTileH)/1296);

		return {x: coordX, y: coordY};
	};

	Map.prototype.coordsToPixels = function (x, y) {
		return {
			x: (mapSize.w - (y - x) * gridCellsDimensions.w) / 2,
			y: (x + y + 1) * gridCellsDimensions.h / 2
		};
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
				nY = start.y + directionVector.y;

			if (nY >= 0 && nY < that.map.length && nX >= 0 && nX < that.map[nY].length) {
				neighbour = that.map[nY][nX];
				if (neighbour !== null && sprites.sprites[neighbour].walkable) {
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

	Map.prototype.draw = function (camera) {
		var x = 0,
			y = 0, coord,
			level = 0,
			startX = 0,
			max = this.map.length - 1,
			spriteInfo;

		while (x <= max && y <= max) {
			// where to print the tiles
			coord = camera.adapt(this.coordsToPixels(x, y));
			if (this.map[y][x] !== null) {
				spriteInfo = sprites.sprites[this.map[y][x]];
				canvasContext.drawImage(sprites.spriteResource,
					spriteInfo.x, spriteInfo.y,
					spriteInfo.w, spriteInfo.d,
					coord.x - relativeTopCornerTile.x, coord.y - relativeTopCornerTile.y,
					spriteInfo.w, spriteInfo.d
				);

				if (debug) {
					canvasContext.beginPath();
					canvasContext.moveTo(coord.x - relativeTopCornerTile.x, coord.y);
					canvasContext.lineTo(coord.x, coord.y - relativeTopCornerTile.y);
					canvasContext.lineTo(coord.x + relativeTopCornerTile.x, coord.y);
					canvasContext.lineTo(coord.x, coord.y + relativeTopCornerTile.y);
					canvasContext.fillStyle = 'rgba(246, 44, 197, 0.5)';
					canvasContext.strokeStyle = 'black';
					canvasContext.fill();
					canvasContext.stroke();
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
	};

	function Me () {
		this.cell = {x: 0, y: 0};
		var start = m.coordsToPixels(this.cell.y, this.cell.y);
		this.x = start.x;
		this.y = start.y;
		this.sprite = sprites.sprites[sprites.SPRITES_ACCESS.PLAYER];
	}

	Me.prototype.draw = function (camera) {
		var coord = camera.adapt(this);

		canvasContext.drawImage(sprites.spriteResource,
			this.sprite.x, this.sprite.y,
			this.sprite.w, this.sprite.h,
			coord.x - this.sprite.posInCell.x, coord.y - this.sprite.posInCell.y,
			this.sprite.w, this.sprite.h
		);
	}

	function loadResources (callback) {
		// sprite + sky, will evolve
		var nbResources = sprites.nbResources + sky.nbResources,
			loaded = 0;

		function onLoadResource () {
			loaded++;

			if (loaded == nbResources) {
				callback();
			}
		}

		sprites.loadResources(onLoadResource);
		sky.loadResources(onLoadResource);
	}

	function resize () {
		canvas.resize();
		camera.w = canvas.getWidth();
		camera.h = canvas.getHeight();
	}

	function draw () {
		m.draw(camera);
		me.draw(camera);

		if (debug) {
			camera.draw();
		}
	}

	function mainLoop () {
		requestAnimationFrame(mainLoop);
		sky.update();
		sky.draw(camera);
		draw();
	}

	loadResources(function () {
		m = new Map(map);
		me = new Me();
		resize();
		mainLoop();
	});

	B.Events.on('resize', null, resize);

	B.Events.on('mousemove', null, function (vectorX, vectorY) {
		camera.setPosition({x: camera.x - vectorX, y: camera.y - vectorY});

	});

	B.Events.on('click', null, function (mouseX, mouseY) {
		var // get the coordinates in the world
			mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
			// convert them in the coordinates of the clicked cell
			dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y),
			// get the center of the clicked cell, this is the player's
			// destination
			cellCoords = m.coordsToPixels(dest.x, dest.y);

		if (m.map[dest.y] === undefined || m.map[dest.y][dest.x] === undefined || m.map[dest.y][dest.x] === null) {
			return;
		}

		me.cell = dest;
		me.x = cellCoords.x;
		me.y = cellCoords.y;
	}, false);

	document.addEventListener('keydown', function (event) {
		var cellCoords, neighbour;
		if (~[37, 38, 39, 40].indexOf(event.keyCode)) {
			// up
			if (event.keyCode === 38) {
				neighbour = m.neighbourAt(me.cell, 'up');
			}
			// right
			else if (event.keyCode === 39) {
				neighbour = m.neighbourAt(me.cell, 'right');
			}
			// down
			else if (event.keyCode === 40) {
				neighbour = m.neighbourAt(me.cell, 'down');
			}
			// left
			else if (event.keyCode === 37) {
				neighbour = m.neighbourAt(me.cell, 'left');
			}

			if (neighbour !== null) {
				me.cell.x = neighbour.x;
				me.cell.y = neighbour.y;
				cellCoords = m.coordsToPixels(me.cell.x, me.cell.y);
				me.x = cellCoords.x;
				me.y = cellCoords.y;
			}
		}
	});
});
