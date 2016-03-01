## Javascript inheritance

How to implement a basic inheritance system in Javascript.

First, an "extends" method has to be created. If a class calls it,
it will inherit the properties and methods of the class given in arguments:

	Object.prototype.extends = function(parent)
	{
		for (var i in parent) {
			this[i] = parent[i];
		}
	};

However, this method will only give access to the static methods and
properties of the parent class (methods and properties of the class).

To give access to the methods and properties of the instances, this
code has to be added:

	childClass.prototype = new parentClass();



### Final result

	Object.prototype.extends = function(parent)
	{
		for (var i in parent) {
			this[i] = parent[i];
		}
	};

	//mother class definition
	function parentClass()
	{
		this.foo = 'bar';
	}
	//a static method
	parentClass.staticMethod = function()
	{
		console.log('I am static');
	};

	//a member method
	parentClass.prototype.instanceMethod = function()
	{
		console.log('I am called from a parentClass instance');
	};


	//child class definition
	function childClass()
	{
		parentClass();
	}

	//inheritance
	childClass.extends(parentClass);
	childClass.prototype = new parentClass();

	//method overload
	childClass.prototype.instanceMethod = function()
	{
		parentClass.prototype.instanceMethod();
		console.log('I am called from a childClass instance');
	};

	//test
	var c = new childClass();
	console.log('call of instanceMethod');
	c.instanceMethod();
	console.log('call of staticMethod');
	childClass.staticMethod();
	console.log('use of some property of the parent class');
	console.log(c.foo);

This code will output:

	call of instanceMethod
	I am called from a parentClass instance
	I am called from a childClass instance
	call of staticMethod
	I am static
	use of some property of the parent class
	bar
