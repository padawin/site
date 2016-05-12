loader.executeModule('main',
'B', 'sky', 'canvas', 'sprites', 'pathFinding', 'camera', 'map', 'character',
'level', 'message', 'GUI', 'screenSize',
function (B, sky, canvas, sprites, pathFinding, camera, Map, Character, level, MessageModule, GUI, screenSize) {
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
		openedFrame = null,
		loadingPadding,
		loadingWidth,
		loadingColor = '#0069b1',
		hoveredCell;

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
	function resize (dimensions) {
		canvas.resize(dimensions);
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
			canvas.getContext().fillText(fps + " fps\n", 10, 20);
			if (hoveredCell) {
				canvas.getContext().fillText("hovered: " + JSON.stringify(hoveredCell), 10, 30);
			}
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

	function openFrame (id) {
		if (openedFrame) {
			return;
		}

		openedFrame = B.$id(id);
		B.removeClass(openedFrame, 'hidden');
	}

	function closeFrame () {
		if (openedFrame) {
			B.addClass(openedFrame, 'hidden');
			openedFrame = null;
		}
	}

	function hasFrameOpened () {
		return openedFrame;
	}

	function initEvents () {
		/**
		 * Event fired when the mouse is moved
		 */
		B.Events.on('mousemove', null, function (mouseX, mouseY) {
			if (hasFrameOpened()) {
				return;
			}

			var // get the coordinates in the world
				mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
				// convert them in the coordinates of the clicked cell
				dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y);

			hoveredCell = dest;
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
			if (hasFrameOpened()) {
				return;
			}

			camera.setPosition({x: camera.x - vectorX, y: camera.y - vectorY});
			camera.setSubject();
		});

		/**
		 * Event fired when the mouse is clicked
		 */
		B.Events.on('click', null, function (mouseX, mouseY) {
			if (hasFrameOpened()) {
				return;
			}

			var // get the coordinates in the world
				mouseInWorld = camera.toWorldCoords({x: mouseX, y: mouseY}),
				// convert them in the coordinates of the clicked cell
				dest = m.pixelsToCoords(mouseInWorld.x, mouseInWorld.y),
				path;

			MessageModule.hide();

			if (!m.isWalkableCell(dest)) {
				return;
			}

			path = pathFinding.astar(m, me.cell, dest);
			if (path.length) {
				me.setPath(path);
				camera.setSubject(me);
			}
		}, false);

		/**
		 * Event fired when a message has to be displayed
		 */
		B.Events.on('message', null, function (message) {
			MessageModule.show(message);
		});

		/**
		 * Event fired when a the contact has been submitted
		 */
		B.Events.on('contactsent', null, function () {
			closeFrame();
			B.Events.fire(
				'message',
				['Your message has been successfully sent']
			);
		});

		/**
		 * Event fired when keyboard key is pressed
		 */
		document.addEventListener('keydown', function (event) {
			if (hasFrameOpened()) {
				if (event.keyCode == 27) {
					closeFrame();
				}
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

	/**
	 * Initialises the menu's events in the HUD
	 */
	function initMenu () {
		var menuLinks = B.$sel('#menu li.frame-button a'),
			closeButtons = B.$sel('.frame .close-button'),
			l, b;

		for (l in menuLinks) {
			B.on(menuLinks[l], 'click', function (event) {
				openFrame(this.getAttribute('rel'));
			}.bind(menuLinks[l]));
		}

		for (b in closeButtons) {
			B.on(closeButtons[b], 'click', closeFrame);
		}
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
		resize(screenSize.get());

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

		// load all the resources. When they are loaded, prerender the map and
		// then start the main loop
		loadResources(function () {
			m.prerender(debug, function () {
				B.removeClass('hud', 'hidden');
				initMenu();
				me = new Character();
				me.setCell(m, 12, 10);
				camera.setPosition(me);

				initEvents();

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

		(function(a,c){document.onkeyup=function(e){c=((e||self.event).keyCode-37)==[1,1,3,3,0,2,0,2,29,28][c]&&(c==9&&a()||c+1)||0;}})(function () {
			B.addClass(canvas.canvas, 'hidden');
			B.addClass('hud', 'hidden');
			B.removeClass('credits', 'hidden');
		}, 0);
	});
});
