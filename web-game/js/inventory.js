loader.addModule('inventory',
'B',
function (B) {
	"use strict";

	var _content = [],
		inventory = {};

	inventory.add = function (name, icon, action) {
		_content.push({name: name, icon: icon});
		var span, li = B.create(
			'li',
			{'data-index': _content.length},
			'inventory-list'
		);
		B.create('img', {src: icon, alt: name}, li);
		span = B.create('span', {text: name}, li);

		B.on(span, 'click', action);
	};

	B.on('open-inventory', 'click', function () {
		B.removeClass('inventory', 'hidden');
	});
	B.on('close-inventory', 'click', function () {
		B.addClass('inventory', 'hidden');
	});

	return inventory;
});
