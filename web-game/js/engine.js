loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding', 'camera', 'map', 'character',
'level', 'message', 'GUI',
function (B, sky, canvas, sprites, pathFinding, camera, Map, Character, level, MessageModule, GUI) {
	"use strict";

	/**
	 * Main module of the game, manage the game loop.
	 */

	var debug = false,
		m, me,
		timePreviousFrame,
		maxFPS = 60,
		interval = 1000 / maxFPS,

		// used in debug mode
		lastCalledTime,
		fpsAccu,
		fps,
		hasFrameOpen = false,
		loadingPadding,
		loadingWidth,
		loadingColor = '#0069b1';

	/**
	 * Method to load the resources needed for the game
	 */
	function loadResources (callback) {
		// sprite + sky, will evolve
		var nbResources = sprites.nbResources + sky.nbResources,
			loaded = 0;

		function onLoadResource () {
			loaded++;

			B.Events.fire('resourceloaded', [loaded, nbResources]);

			if (loaded == nbResources) {
				callback();
			}
		}

		B.Events.fire('resourceloaded', [loaded, nbResources]);
		sprites.loadResources(onLoadResource);
		sky.loadResources(onLoadResource);
	}

	/**
	 * Method to adapt the canvas dimensions to the screen and the camera to the
	 * canvas
	 */
	function resize () {
		canvas.resize();
		camera.w = canvas.getWidth();
		camera.h = canvas.getHeight();
	}

	/**
	 * Main draw method. Draws the sky, the map and its objects
	 */
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

	/**
	 * Method called at each frame of the game. Updates all the entities and
	 * then draw them.
	 */
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

	/**
	 * Initialises the menu's events in the HUD
	 */
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

	/**
	 * Entry point of the game. Initialises the map, plugs the event and does a
	 * certain amount of mess. @TODO To be refactored
	 */
	function startGame () {
		document.body.removeChild(B.$id('intro'));

		m = new Map(
			level.ground,
			level.walkables,
			level.gridCellsDimensions,
			level.objects
		);
		resize();
		loadingPadding = canvas.getWidth() / 5;
		loadingWidth = 3 * loadingPadding;

		MessageModule.init();

		/**
		 * Event fired when the window is resized
		 */
		B.Events.on('resize', null, resize);

		/**
		 * Event fired when a resource is loaded
		 */
		B.Events.on('resourceloaded', null, function (nbLoaded, nbTotal) {
			GUI.progressBar(
				loadingPadding, canvas.getHeight() / 2,
				loadingWidth, 30,
				nbLoaded / nbTotal,
				loadingColor, 'white', loadingColor
			);
		});

		/**
		 * Event fired when the mouse is moved
		 */
		B.Events.on('mousemove', null, function (mouseX, mouseY) {
			if (hasFrameOpen) {
				return;
			}

			var // get the coordinates in the world
				mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
				// convert them in the coordinates of the clicked cell
				dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y);


			if (m.isWalkableCell(dest)) {
				m.highlight(dest);
			}
			else {
				m.highlight(null);
			}
		});

		/**
		 * Event fired when the mouse is moved with the left button pressed
		 */
		B.Events.on('mousedrag', null, function (vectorX, vectorY) {
			if (hasFrameOpen) {
				return;
			}

			camera.setPosition({x: camera.x - vectorX, y: camera.y - vectorY});
			camera.setSubject();
		});

		/**
		 * Event fired when the mouse is clicked
		 */
		B.Events.on('click', null, function (mouseX, mouseY) {
			if (hasFrameOpen) {
				return;
			}

			var // get the coordinates in the world
				mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
				// convert them in the coordinates of the clicked cell
				dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y);

			MessageModule.hide();

			if (!m.isWalkableCell(dest)) {
				return;
			}

			me.setPath(pathFinding.astar(m, me.cell, dest));
			camera.setSubject(me);
		}, false);

		/**
		 * Event fired when a message has to be displayed
		 */
		B.Events.on('message', null, function (message) {
			MessageModule.show(message);
		});

		/**
		 * Event fired when keyboard key is pressed
		 */
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

		// load all the resources. When they are loaded, prerender the map and
		// then start the main loop
		loadResources(function () {
			m.prerender(debug, function () {
				B.removeClass('hud', 'hidden');
				initMenu();
				me = new Character(m);
				camera.setPosition(me);
				timePreviousFrame = Date.now();
				lastCalledTime = Date.now();
				fpsAccu = 0;
				mainLoop();
			});
		});
	}

	// start the game when the start button is clicked
	B.on('start', 'click', function () {
		startGame();
	});
});
