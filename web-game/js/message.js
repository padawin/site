loader.addModule('message',
'B', function (B) {
	var messageModule,
		messageElement,
		messageContainer;

	messageModule = {
		init: function () {
			messageElement = B.$id('message');
			messageContainer = B.$sel('#message .content')[0];
		},
		show: function (msg) {
			messageContainer.innerText = msg;
			B.removeClass(messageElement, 'hidden');
		},
		hide: function () {
			messageContainer.innerText = '';
			B.addClass(messageElement, 'hidden');
		},
	};

	return messageModule;
});
