loader.executeModule('contactForm', 'B', function (B) {
	"use strict";
	/**
	 * Module to set the events on the contact form and send a request
	 * when the form is submitted
	 */

	var form = B.$id('contact-form');
	B.on(form, 'submit', function (e) {
		e.preventDefault();

		var url = window.location.protocol + '//' + window.location.host + '/contact',
			data = {
				from: form.from.value,
				message: form.message.value
			};
		B.Ajax.request(
			url,
			{
				200: function () {
					form.reset();
					B.Events.fire('contactsent');
				},
				400: function (xhr) {
					var response = JSON.parse(xhr.response),
						error = response.error || 'An error occured';
					B.$id('error-form').innerHTML = error;
				},
				500: function () {
					B.$id('error-form').innerHTML = 'An error occured';
				}
			}, null, 'POST', JSON.stringify(data)
		);
	});
});

