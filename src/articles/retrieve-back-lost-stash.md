## Retrieve back a lost stash

I just ran by mistake

	git stash drop

instead of

	git stash pop

Thanksfully, like any object in Git, a stash has a hash, and git gc has not run
since.

As a reminder, when a stash is dropped, here is what is displayed:

	Dropped refs/stash@{0} (bcb91f756ed9ba604f93daf03bf07ee0ff2d8345)

To retrieve my stash, I just had to run:

	git stash apply bcb91f756ed9ba604f93daf03bf07ee0ff2d8345

And my changes were back as local modifications.
