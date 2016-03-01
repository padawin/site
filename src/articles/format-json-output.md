## Format json output

Usage

	some-not-formated-json-string | python -mjson.tool

Exemple
Creation of a json.php script which outputs a JSON string:

	<?php
	$a = array(
		'foo' => 'bar',
		'boo' => 'far'
	);

	echo json_encode($a);

Here is the output of the script:

	> php test-json.php
	{"foo":"bar","boo":"far"}

And with json.tool :

	> php test-json.php  | python -mjson.tool
	{
		"boo": "far",
		"foo": "bar"
	}
