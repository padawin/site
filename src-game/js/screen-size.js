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
			w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
	}

	updateScreenSize();

	window.addEventListener('resize', function (e) {
		B.addClass(document.body, 'hidden');
		updateScreenSize();
		B.removeClass(document.body, 'hidden');
		B.Events.fire('resize', [screenSizeValues]);
	}, false);

	return screenSize;
});
