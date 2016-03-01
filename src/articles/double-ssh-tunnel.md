## Double ssh tunnel

A developer in my team who worked from his place once needed to connect to one
of our servers to see logs. But the only way for him to reach it was to do a ssh
connection from the develoment server to the production server, and then from
there, a second connection to the log server.

But as a developer, he didn't have access to the production servers.
So I shared a Tmux session with him, from there I did my double connection
to the log server through the production server, and then I let him do what he
needed.

I could have done a first ssh connection to the first server, and then a second
one to the second server, but the issue here is if the second connection was
closed, the developer would have been on the production server, which wasn't
good. So I needed a double connection as below, so closing the connection would
close all of them.

### The command

	ssh -t -t -Lport:localhost:port login@server1 'ssh -Lport:localhost:port login@server2'
