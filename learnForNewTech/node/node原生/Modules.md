## Modules

### Accessing the main module

When a file is run directly from Node.js, **require.main** is set to its module. That means that you can determine whether a file has been run directly by testing.That means that you can determine whether a file has been run directly by testing:

	require.main === module

For a file foo.js, this will be **true** if run via 
	
	node foo.js

but **false** if run by 
	
	require('./foo').