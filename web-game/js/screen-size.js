loader.addModule('screenSize', 'B', function (B) {
	"use strict";

	/**
	 * Module to manage the screen size and fire events if the dimensions of the
	 * screen change.
	 */

	var screenSizeValues,
		screenSize = {
			get: function () {
				return screenSizeValues;
			}
		};

	function updateScreenSize () {
		screenSizeValues = {
			x: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			y: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
	}

	updateScreenSize();

	window.addEventListener('resize', function (e) {
		updateScreenSize();
		B.Events.fire('resize');
	}, false);

	return screenSize;
});
