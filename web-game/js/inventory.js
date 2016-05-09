loader.addModule('inventory',
'B',
function (B) {
	"use strict";

	/**
	 * Module to manage the inventory, also interacts with the inventory DOM
	 * element.
	 */

	var _content = [],
		inventory = {};

	inventory.add = function (object) {
		_content.push(object);
		var span, li = B.create(
			'li',
			{'data-index': _content.length},
			'inventory-list'
		);
		B.create('img', {src: object.icon, alt: object.name}, li);
		span = B.create('span', {text: object.name}, li);

		if (object.onopen) {
			B.on(li, 'click', object.onopen);
		}
	};

	return inventory;
});
