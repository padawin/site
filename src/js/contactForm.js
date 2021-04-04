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
					B.$id('error-form').innerHTML = 'Your message has been sent!';
				},
				400: function (xhr) {
					var response = JSON.parse(xhr.response),
						error = response.error || 'An error occured';
					B.$id('error-form').innerHTML = error;
				},
				500: function () {
					B.$id('error-form').innerHTML = 'An error occured';
				},
				502: function () {
					var error = "The server seems to have some issues, but don't worry, you can still find me on linkedin (https://uk.linkedin.com/pub/ghislain-rodrigues/45/68a/322)";
					B.$id('error-form').innerHTML = error;
				}
			}, null, 'POST', JSON.stringify(data), {headers: {'content-type': 'application/json'}}
		);
	});
});

