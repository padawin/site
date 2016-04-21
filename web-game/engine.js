
loader.executeModule('main', 'B', function (B) {
	"use strict";

	var canvas = document.getElementById('myCanvas'),
		canvasContext = canvas.getContext('2d'),
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
		camera = {x:0, y:0},
		spriteBoard,
		spriteBoardUrl = 'sprite.png',
		tileDimensions = {w: 64, h: 36, d: 73},
		mapSize = {
			// assumes square map
			w: map.length * tileDimensions.w,
			h: map.length * tileDimensions.h
		};

	function Map (m) {
		this.map = m;
	}

	Map.prototype.pixelsToCoords = function (x, y) {
		var midTileW = tileDimensions.w/2,
			midTileH = tileDimensions.h/2,
			coordX = parseInt((x*midTileH + y*midTileW - (288+midTileW)*midTileH)/1296),
			coordY = parseInt((-x*midTileH + y*midTileW + (288+midTileW)*midTileH)/1296);

		return {x: coordX, y: coordY};
	};

	Map.prototype.coordsToPixels = function (x, y) {
		return {
			x: (mapSize.w - (y - x) * tileDimensions.w) / 2,
			y: (x + y + 1) * tileDimensions.h / 2
		};
	};

	Map.prototype.draw = function (camera) {
		var x = 0,
			y = 0, coord,
			level = 0,
			startX = 0,
			max = this.map.length - 1,
			relativeTopCornerTile = {
				x: tileDimensions.w / 2,
				y: tileDimensions.h / 2
			};

		while (x <= max && y <= max) {
			// where to print the tiles
			coord = this.coordsToPixels(x, y);
			if (this.map[y][x] !== null) {
				canvasContext.drawImage(spriteBoard,
					this.map[y][x] * tileDimensions.w, 0,
					tileDimensions.w, tileDimensions.d,
					coord.x - relativeTopCornerTile.x, coord.y - relativeTopCornerTile.y,
					tileDimensions.w, tileDimensions.d
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
		this.x = 0;
		this.y = 2;
		this.tileDimensions = {w: 64, h: 64};
		this.relativeTopCornerTile = {x: 32, y: 44};
		this.spritePosition = {x: 0, y: tileDimensions.d};
	}

	Me.prototype.draw = function () {
		var coordX = (mapSize.w - (this.y - this.x) * tileDimensions.w) / 2,
			coordY = (this.x + this.y + 1) *  tileDimensions.h / 2;

		canvasContext.drawImage(spriteBoard,
			this.spritePosition.x, this.spritePosition.y,
			this.tileDimensions.w, this.tileDimensions.h,
			coordX - this.relativeTopCornerTile.x, coordY - this.relativeTopCornerTile.y,
			this.tileDimensions.w, this.tileDimensions.h
		);
	}

	function loadResources (callback) {
		spriteBoard = new Image();
		spriteBoard.onload = function () {
			callback();
		};
		spriteBoard.src = spriteBoardUrl;
	}

	loadResources(function () {
		m = new Map(map);
		me = new Me();
		resizeCanvas();
	})

	B.Events.on('resize', null, resizeCanvas);

	canvas.addEventListener('click', function (event) {
		var rect = canvas.getBoundingClientRect(),
			root = document.documentElement,
			mouseX = event.clientX - rect.left - root.scrollLeft,
			mouseY = event.clientY - rect.top - root.scrollTop,
			dest = m.pixelsToCoords(mouseX, mouseY);

		if (m.map[dest.y] === undefined || m.map[dest.y][dest.x] === undefined || m.map[dest.y][dest.x] === null) {
			return;
		}

		me.x = dest.x;
		me.y = dest.y;
	}, false);

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		m.draw(camera);
		me.draw();
	}
});
