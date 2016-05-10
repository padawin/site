loader.executeModule('contactForm', 'B', function (B) {
	"use strict";
	/**
	 * Module to set the events on the contact form and send a request
	 * when the form is submitted
	 */

	var form = B.$id('contact-form');
	B.on(form, 'submit', function (e) {
		e.preventDefault();

		var data = {
			from: form.from.value,
			message: form.message.innerText
		};
		B.Ajax.request(
			'/contact',
			{
				200: function () {
					console.log('200');
					console.log(arguments);
				},
				400: function () {
					console.log('400');
					console.log(arguments);
				},
				500: function () {
					console.log('500');
					console.log(arguments);
				}
			}, null, 'POST', JSON.stringify(data)
		);
	});
});

