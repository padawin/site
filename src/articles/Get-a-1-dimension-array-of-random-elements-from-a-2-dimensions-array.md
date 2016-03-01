## Get a 1 dimension array of random elements picked from a 2 dimension array

	window.random = function(rows, nbToReturn) {
		// group all sub arrays in a flat array
		return [].concat.apply([], rows)
			// randomize
			.sort(function(){return 0.5 - Math.random()})
			// takes the nbToReturn first
			.splice(0, nbToReturn);
	};

Use:

	var a = [[1,2,3],[4,5,6],[7,8,9]];
	console.log(random(a, 4));

displays:

	[4, 5, 6, 1]

Link to gist: https://gist.github.com/padawin/4b40456e48591dea5aeb
