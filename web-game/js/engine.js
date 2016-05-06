loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding', 'camera', 'map', 'character',
'level', 'message',
function (B, sky, canvas, sprites, pathFinding, camera, Map, Character, level, MessageModule) {
	"use strict";

	var debug = false,
		m, me,
		timePreviousFrame,
		maxFPS = 60,
		interval = 1000 / maxFPS,

		// used in debug mode
		lastCalledTime,
		fpsAccu,
		fps,
		hasFrameOpen = false;

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
		m.drawObjects(camera);

		if (debug) {
			camera.draw();

			canvas.getContext().font = "12px Arial";
			canvas.getContext().fillStyle = 'black';
			canvas.getContext().fillText(fps + " fps", 10, 20);
		}
	}

	function mainLoop () {
		requestAnimationFrame(mainLoop);
		var now = Date.now(),
			delta = now - timePreviousFrame;

		// cap the refresh to a defined FPS
		if (delta > interval) {
			timePreviousFrame = now - (delta % interval);

			// calculate current fps in debug mode only
			if (debug) {
				delta = now - lastCalledTime;
				if (delta > 1000) {
					lastCalledTime = now;
					fps = fpsAccu;
					fpsAccu = 0;
				}
				else {
					fpsAccu++;
				}
			}

			m.update();
			me.update(m);
			camera.update();
			sky.update();
			draw();
		}
	}

	function initMenu () {
		B.on('open-inventory', 'click', function () {
			if (hasFrameOpen) {
				return;
			}

			hasFrameOpen = true;
			B.removeClass('inventory', 'hidden');
		});
		B.on('close-inventory', 'click', function () {
			hasFrameOpen = false;
			B.addClass('inventory', 'hidden');
		});
		B.on('open-profile', 'click', function () {
			if (hasFrameOpen) {
				return;
			}

			hasFrameOpen = true;
			B.removeClass('player-stats', 'hidden');
		});
		B.on('close-profile', 'click', function () {
			hasFrameOpen = false;
			B.addClass('player-stats', 'hidden');
		});
	}

	function startGame () {
		document.body.removeChild(B.$id('intro'));
		loadResources(function () {
			m = new Map(
				level.ground,
				level.walkables,
				level.gridCellsDimensions,
				level.objects
			);
			m.prerender(debug, function () {
				B.removeClass('hud', 'hidden');
				initMenu();
				me = new Character(m);
				camera.setPosition(me);
				resize();
				timePreviousFrame = Date.now();
				lastCalledTime = Date.now();
				fpsAccu = 0;
				mainLoop();
			});
		});

		MessageModule.init();

		B.Events.on('resize', null, resize);

		B.Events.on('mousemove', null, function (vectorX, vectorY) {
			if (hasFrameOpen) {
				return;
			}

			camera.setPosition({x: camera.x - vectorX, y: camera.y - vectorY});
			camera.setSubject();
		});

		B.Events.on('click', null, function (mouseX, mouseY) {
			if (hasFrameOpen) {
				return;
			}

			var // get the coordinates in the world
				mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
				// convert them in the coordinates of the clicked cell
				dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y);

			MessageModule.hide();

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

		B.Events.on('message', null, function (message) {
			MessageModule.show(message);
		});

		document.addEventListener('keydown', function (event) {
			if (hasFrameOpen) {
				return;
			}

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
	}

	B.on('start', 'click', function () {
		startGame();
	});
});
