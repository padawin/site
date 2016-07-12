## Virtualenv explained

In python, a virtualenv is a way to isolate a project technical environment
from another.

For example, a project might need a certain version of python and some packages
that another project doesn't. Virtualenvs allow to isolate the needed packages
per environment.

### Different solutions

If you are using python3, it provides the package [venv](https://docs.python.org/3/library/venv.html#module-venv)

Otherwise, it is possible to use the package from pip ```virtualenv```

## Using virtualenv

### Setting up virtualenv

virtualenv can be installed using pip:

	pip install virtualenv

Along with the python executables, this is the only part needed globally.

### Creating a virtualenv

To create a virtualenv, run:

	virtualenv <ENVNAME>

This will create a folder named &lt;ENVNAME&gt; where the command has been run.

When creating a virtualenv, the system's default python version will be used in
it. If a virtualenv needs another version of python, it can be specified with
the -p option when creating the virtualenv:

	mkvirtualenv <ENVNAME> -p /path/to/python

or for example (to explicitely use python2, which needs to be installed on the
machine):

	mkvirtualenv <ENVNAME> -p `which python2`

### Using a virtualenv

Once the virtualenv created, to use it, the following command has to be
executed:

	source ./<ENVNAME>/bin/activate

This will set some environment variable to point to the virtualenv location and
will update the PS1 value to display the name of the virtualenv currently in
use.

The scope of this command is the current terminal only, if another terminal is
opened, it will be using no virtualenv.

### Stop working on a virtual env

To leave a virtualenv's session, run:

	deactivate

After that, the system's environment will be used.

### Deleting a virtualenv

To delete a virtualenv, just delete its folder.

## virtualenv-wrapper

With virtualenv, each environment can be created in different places, and those
places have to be remembered. And activating a virtualenv can be relatively
tedious.

A wrapper has been created to simplify those steps: virtualenv-wrapper

### Setting up virtualenv-wrapper

virtualenv-wrapper can be installed using pip:

	pip install virtualenv-wrapper

Then the following line has to be added in the user's .bashrc:

	source /usr/local/bin/virtualenvwrapper.sh

### Creating a virtualenv

To create a virtualenv, run:

	mkvirtualenv <ENVNAME>

This will set up a virtual env in ~/virtualenvs/&lt;ENVNAME&gt;/ and activate it in the
current shell's session.

Same as for the virtualenv, the python executable to use can be provided with
the -p option.

### Switch back on an existing environment

To reactivate a virtualenv, run:

	workon <ENVNAME>

### Delete a virtualenv

To delete a virtualenv, run:

	rmvirtualenv <ENVNAME>
