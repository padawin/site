## A way to write a method

During peer programming session with a colleague, we had to write a
method. Here's how I proceeded:

We had the method's signature and we were ready to implement it. Just when we
were about to do it, I told my colleague: "ok, we have to implement this method,
we know what it get in its input and we know what type of data it must return
(an array in our case), so first, let's write that". And here's what I wrote:

	protected function _myFunction($arg1, $arg2...)
	{
		$return = array();

		return $return;
	}

And then we started to actually implement the method.
I like this approach of coding, it prevents you from forgetting some parts of
the implementation (returning your data for example) and then you can focus on
the implementation in itself.

I saw quite a few time to see some code failing or not behaving the way I expect
it to just because the return was forgotten.

It is also useful with tests, by implementing first your input and outputs, you
can test your code from the beginning (the method must return an (empty) array),
and then implementing it and updating the tests.
