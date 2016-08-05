<b>Published: July 2014</b>

## Unnecessary elses

I often see code like that:

	function foo() {
		if (condition) {
			return something;
		} else {
			doSomethingElse();
		}
	}

Because the first condition returns and is followed with an else, this can be
simplified into:

	function foo() {
		if (condition) {
			return something;
		}

		doSomethingElse();
	}

Which remove an indentation level and simplifies the code readability, in my
opinion.
