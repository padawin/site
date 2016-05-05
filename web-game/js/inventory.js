loader.addModule('inventory',
'B',
function (B) {
	"use strict";

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
			B.on(span, 'click', object.onopen);
		}
	};

	B.on('open-inventory', 'click', function () {
		B.removeClass('inventory', 'hidden');
	});
	B.on('close-inventory', 'click', function () {
		B.addClass('inventory', 'hidden');
	});

	return inventory;
});
