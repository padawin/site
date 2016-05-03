
loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding', 'camera', 'map',
function (B, sky, canvas, sprites, pathFinding, camera, Map) {
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
			[n, 0, 0, 1, 0, n, 3, 3, n, 0],
			[n, 0, 0, 1, 2, n, 3, 3, n, 0],
			[n, 0, 0, 1, 0, n, 3, 3, n, 0],
			[n, 0, 0, 1, 0, n, n, n, n, 0],
			[n, 0, 0, 1, 0, 0, 0, 0, 0, 0]
		],
		mapWalkables = [
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
			[1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
			[0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
			[0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
			[0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
			[0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],

		gridCellsDimensions = {w: 64, h: 36};

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
		var pointNextDest, distance, direction, gridSpeed;

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

		gridSpeed = {
			x: this.path[0].x - this.cell.x,
			y: this.path[0].y - this.cell.y,
		};
		if (gridSpeed.x > 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_RIGHT
			];
		}
		else if (gridSpeed.y > 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_LEFT
			];
		}
		else if (gridSpeed.x < 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_UP_LEFT
			];
		}
		else if (gridSpeed.y < 0) {
			this.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_UP_RIGHT
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
		m.draw(camera, debug);
		me.draw(camera);

		if (debug) {
			camera.draw();
		}
	}

	function mainLoop () {
		requestAnimationFrame(mainLoop);
		m.update();
		me.update();
		camera.update();
		sky.update();
		draw();
	}

	loadResources(function () {
		m = new Map(map, mapWalkables, gridCellsDimensions);
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

		if (
			m.map[dest.y] === undefined ||
			m.map[dest.y][dest.x] === undefined ||
			m.map[dest.y][dest.x] === null ||
			!m.walkables[dest.y][dest.x]
		) {
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
