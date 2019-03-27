## Git hooks templates

Hooks in Git are scripts executed at specific moments (e.g. before or after
committing). A complete explanation about how to use them can be found by
running:

	git help hooks

If you have hooks that you use in all your projects, Git provides a system of
templates to automatically define parts of the .git directories which will be
created in the future. A template can contain, among other things, a hooks
directory to store the hooks to use.

First, you need to create the directory you want to use as template with the
hooks you want to have in your projects:

	mkdir -p /path/to/template/directory/hooks
	touch /path/to/template/directory/hooks/pre-commit
	# write hook script
	chmod +x /path/to/template/directory/hooks/pre-commit

Then, you need to define in your configuration that Git should use a template
directory:

	git config --global init.templatedir /path/to/template/directory/

Then if you create a new repository (```git init```) or clone an existing one,
it will contain the hooks you defined in your template.

If you want to apply your template in already existing clones, run

	git init .

at the root of the repository.

More information is available in Git's manual:

	git init --help
