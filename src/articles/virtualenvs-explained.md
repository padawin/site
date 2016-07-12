## Virtualenv explained

In python, a virtualenv is a way to isolate a project technical environment
from another.

For example, a project might need a certain version of python and some packages
that another project doesn't. Virtualenvs allow to isolate the needed packages
per environment.

### Setting up virtualenvs

Virtualenvs can be installed via pip:

	pip install virtualenv-wrapper

This will give access to a set of commands to use virtualenvs.

Along with the python executables, this is the only part needed globally.

### Creating a virtualenv

To create a virtualenv, run:

	mkvirtualenv <ENVNAME>

This will set up a virtual env in ~/virtualenvs/<ENVNAME>/ and activate it in the
current shell's session.

When creating a virtualenv, the system's default python version will be used in
it. If a virtualenv needs another version of python, it can be specified with
the -p option when creating the virtualenv:

	mkvirtualenv <ENVNAME> -p /path/to/python

or for example (to explicitely use python2, which needs to be installed on the
machine):

	mkvirtualenv <ENVNAME> -p `which python2`

Once the virtualenv installed, it will be directly used. every packages
installed with pip will then be installed in ~/.virtualenvs/<ENVNAME>/.

### Stop working on a virtual env

To leave a virtualenv's session, run:

	deactivate

After that, the system's environment will be used.

### Switch back on an existing environment

To reactivate a virtualenv, run:

	workon <ENVNAME>

### Delete a virtualenv

To delete a virtualenv, run:

	rmvirtualenv <ENVNAME>
