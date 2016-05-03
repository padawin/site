
loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding', 'camera', 'map', 'character',
function (B, sky, canvas, sprites, pathFinding, camera, Map, Character) {
	"use strict";

	var debug = false,
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
		me.update(m);
		camera.update();
		sky.update();
		draw();
	}

	loadResources(function () {
		m = new Map(map, mapWalkables, gridCellsDimensions);
		me = new Character(m);
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
