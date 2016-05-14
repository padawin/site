/**
 * Module to providing visual elements (such as loading bar)
 */
loader.addModule('GUI',
'canvas', 'B',
function (Canvas, B) {
	"use strict";

	var GUI = {
		/**
		 * Draws a progress bar.
		 * A progress bar has:
		 * - a top/left position in the canvas (x, y),
		 * - a width and height (w, y),
		 * - a progress in percents,
		 * - a border color (String),
		 * - a color for the unloaded part (String)
		 * - a color for the loaded part (String)
		 */
		progressBar: function (x, y, w, h, progress, colorBorder, colorUnloaded, colorLoaded) {
			if (progress > 1.0) {
				progress = 1.0;
			}
			Canvas.drawRectangle(
				x, y, w, h, colorUnloaded, colorBorder
			);

			if (progress > 0.000000) {
				Canvas.drawRectangle(
					x, y, w * progress, h, colorLoaded, colorLoaded
				);
			}
		},

		// Dirty
		tabs: function () {
			var tabContents = B.$sel('.tabs li'), t;
			function click (element) {
				return function () {
					var c, tabContainer;

					B.removeClass(
						element.parentNode.querySelectorAll('.active')[0],
						'active'
					);
					B.addClass(element, 'active');

					tabContainer = B.$id(element.getAttribute('rel')).parentNode;
					for (c = 0; c < tabContainer.children.length; c++) {
						if (tabContainer.children[c].id == element.getAttribute('rel')) {
							B.removeClass(tabContainer.children[c], 'hidden');
						}
						else {
							B.addClass(tabContainer.children[c], 'hidden');
						}
					}
				};
			}

			for (t = 0; t < tabContents.length; t++) {
				if (!B.hasClass(tabContents[t], 'active')) {
					B.addClass(tabContents[t].getAttribute('rel'), 'hidden');
				}

				B.on(tabContents[t], 'click', click(tabContents[t]));
			}
		},

		collapsable: function () {
			var questTitles = B.$sel('.quest h3'), t;
			function click (element) {
				return function () {
					if (B.hasClass(element.parentNode, 'active')) {
						B.removeClass(element.parentNode, 'active');
					}
					else {
						B.addClass(element.parentNode, 'active');
					}
				};
			}
			for (t = 0; t < questTitles.length; t++) {
				B.on(questTitles[t], 'click', click(questTitles[t]));
			}
		}
	};

	return GUI;
});
