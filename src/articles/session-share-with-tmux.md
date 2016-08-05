<b>Published: 1st March 2014</b>

## Session share with tmux

The following commands allow two or more people to use a same Tmux instance.
On a shared session, the users can type commands and see what others are
typing.
This can be usefull to show, explain stuffs... to people who cannot see your
screen.

	# specify the name of your tmux socket with -S when creating it
	# the session file (here /tmp/pair) must be accessible to all user
	# who will share the session
	tmux -S /tmp/pair
	# chmod to allow other users to access it
	chmod 777 /tmp/pair

	# now the other user can connect with
	tmux -S /tmp/pair attach
