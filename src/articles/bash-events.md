## Bash events

Bash has a notion of events, refering to the commands which have been run
previously. Those commands can be seen with the history command.

Each command in the history has a number and can be referenced with the !
character. For example, running:

	!42

will re-execute the command at the index 42 in your command history.

### Last command run

The last command which has been executed can be quickly accessed with ```!!```.

This can be useful if you have to run a command multiple times in a row (I find
arrow up + return being not as conveniently placed), or if the command you ran
actually needs sudo to be done:

	sudo !!

### Command arguments

The events also allow to access the arguments of the commands you ran in the
past. The generic command is:

	!commandIndex:argumentIndex

For example, if your history has the following line:

	564  echo a b c d e

you can access the 2nd argument of the command (that is, b) with:

	!564:2

Additionally, bash also supports regex like notation:

	# first argument
	!:^
	# last argument
	!:$
	# all the arguments
	!:*
	# range of arguments
	!:2-4
	# the argument 0 is the program run
	!:0


### Example

Imagine you typed:

	gut status

instead of

	git status

and you have to retype your command. Instead of retyping everything, you can
either use the arrow up to go to the last command, amend your command and run it
properly this time. Or you can type:

	git !$

which will expand to:

	git status
