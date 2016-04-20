loader.executeModule('screenSize', 'B', function (B) {
	"use strict";

	window.addEventListener('resize', function () {
		B.Events.fire('resize');
	}, false);
});
