## Get the used memory in a program in python

	import resource
	print resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
