
loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding',
function (B, sky, canvas, sprites, pathFinding) {
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
		subject: null,
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
		setSubject (subject) {
			this.subject = subject;
		},
		setPosition (coordinates) {
			this.x = coordinates.x;
			this.y = coordinates.y;
		},
		update: function () {
			if (!this.subject) {
				return;
			}

			var cameraPosition = {x: camera.x, y: camera.y};

			if (camera.w / 2 - (this.subject.x - camera.x) < 150) {
				cameraPosition.x = this.subject.x - (camera.w / 2 - 150);
			}
			else if (camera.w / 2 - (camera.x - this.subject.x) < 150) {
				cameraPosition.x = this.subject.x + (camera.w / 2 - 150);
			}

			if (camera.h / 2 - (this.subject.y - camera.y) < 150) {
				cameraPosition.y = this.subject.y - (camera.h / 2 - 150);
			}
			else if (camera.h / 2 - (camera.y - this.subject.y) < 150) {
				cameraPosition.y = this.subject.y + (camera.h / 2 - 150);
			}

			this.setPosition(cameraPosition);
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

	/**
	* Convert a set of pixels in the map projection and returns the coordinates
	* of the cell in the grid
	*/
	Map.prototype.pixelsToCoords = function (x, y) {
		var midTileW = gridCellsDimensions.w/2,
			midTileH = gridCellsDimensions.h/2,
			coordX = (x / midTileW + y / midTileH) /2 - map.length / 2,
			coordY = (y / midTileH - x / midTileW) /2 + map.length / 2;

		return {x: 0|coordX, y: 0|coordY};
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
				nY = start.y + directionVector.y,
				neighbour;

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
		this.setCell(0, 0);
		this.path = [];
		this.frame = 0;
		this.maxFrame = 4;
		this.tick = 0;
		this.timePerFrame = 8;
		this.sprite = sprites.sprites[sprites.SPRITES_ACCESS.PLAYER_RIGHT];
		this.maxLinearSpeed = 2;
		this.speed = {x: 0, y: 0};
	}

	Me.prototype.calculateSpeed = function (remaining, direction) {
		if (remaining <= this.maxLinearSpeed) {
			this.speed = direction;
		}
		else {
			this.speed.x = direction.x * this.maxLinearSpeed / remaining;
			this.speed.y = direction.y * this.maxLinearSpeed / remaining;
		}
	}

	Me.prototype.setCell = function (x, y) {
		var start;

		this.cell = {x: x, y: y};
		start = m.coordsToPixels(this.cell.x, this.cell.y);
		this.x = start.x;
		this.y = start.y;
	};

	Me.prototype.setPath = function (path) {
		this.path = path;
	};

	Me.prototype.update = function () {
		var pointNextDest, distance, direction;

		// nowhere to go
		if (!this.path.length) {
			// was moving and just arrived
			// depending on his speed, set the rest position sprite
			if (this.speed !== {x: 0, y: 0}) {
				this.frame = 0;
				if (this.speed.x > 0) {
					this.sprite = sprites.sprites[
						sprites.SPRITES_ACCESS.PLAYER_RIGHT
					];
				}
				else if (this.speed.y > 0) {
					this.sprite = sprites.sprites[
						sprites.SPRITES_ACCESS.PLAYER_LEFT

					];
				}
				this.speed = {x: 0, y: 0};
			}
			return;
		}

		// The player has to reach its destination, update its speed so it
		// won't go past it

		// get the coordinates of the next point to reach
		pointNextDest = m.coordsToPixels(
			this.path[0].x, this.path[0].y
		);
		// get direction vector
		direction = {
			x: pointNextDest.x - this.x,
			y: pointNextDest.y - this.y
		};
		// get remaining distance to walk
		distance = calcDistance(
			{x: 0, y: 0},
			direction
		);
		// calculate speed
		this.calculateSpeed(distance, direction);
		this.updatePosition();
		this.updateFrame();

		if (this.speed.x > 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_RIGHT
			];
		}
		else if (this.speed.y > 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_LEFT
			];
		}

		if (this.x == pointNextDest.x && this.y == pointNextDest.y) {
			this.setCell(this.path[0].x, this.path[0].y);
			this.path.shift();
		}
	};

	Me.prototype.updatePosition = function () {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	Me.prototype.updateFrame = function () {
		this.tick++;
		if (this.tick == this.timePerFrame) {
			this.tick = 0;
			this.frame = (this.frame + 1) % this.maxFrame;
		}
	};

	Me.prototype.draw = function (camera) {
		var coord = camera.adapt(this), s;

		s = this.sprite;
		if (s.animation !== undefined) {
			s = s.animation[this.frame];
		}

		canvasContext.drawImage(sprites.spriteResource,
			s.x, s.y,
			s.w, s.h,
			coord.x - s.posInCell.x, coord.y - s.posInCell.y,
			s.w, s.h
		);
	}

	function calcDistance (p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
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
		sky.draw(camera);
		m.draw(camera);
		me.draw(camera);

		if (debug) {
			camera.draw();
		}
	}

	function mainLoop () {
		requestAnimationFrame(mainLoop);
		me.update();
		camera.update();
		sky.update();
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
		camera.setSubject();
	});

	B.Events.on('click', null, function (mouseX, mouseY) {
		var // get the coordinates in the world
			mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
			// convert them in the coordinates of the clicked cell
			dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y);

		if (m.map[dest.y] === undefined || m.map[dest.y][dest.x] === undefined || m.map[dest.y][dest.x] === null) {
			return;
		}

		me.setPath(pathFinding.astar(m, me.cell, dest));
		camera.setSubject(me);
	}, false);

	document.addEventListener('keydown', function (event) {
		var neighbour;
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
				me.setPath([neighbour]);
				camera.setSubject(me);
			}
		}
	});
});
