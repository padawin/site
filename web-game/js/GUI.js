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
			for (t = 0; t < tabContents.length; t++) {
				if (!B.hasClass(tabContents[t], 'active')) {
					B.addClass(tabContents[t].getAttribute('rel'), 'hidden');
				}

				B.on(tabContents[t], 'click', function () {
					var c, tabContainer;

					B.removeClass(
						this.parentNode.querySelectorAll('.active')[0],
						'active'
					);
					B.addClass(this, 'active');

					tabContainer = B.$id(this.getAttribute('rel')).parentNode;
					for (c = 0; c < tabContainer.children.length; c++) {
						if (tabContainer.children[c].id == this.getAttribute('rel')) {
							B.removeClass(tabContainer.children[c], 'hidden');
						}
						else {
							B.addClass(tabContainer.children[c], 'hidden');
						}
					}
				}.bind(tabContents[t]));
			}
		}
	};

	return GUI;
});
