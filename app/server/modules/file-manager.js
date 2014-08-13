var fs = require('fs');

exports.mkdir = function(user)
{
	console.log('File-manager: Create account dir');
	fs.mkdirSync('./app/server/accounts/'+user);
}

exports.listDocuments = function(user, callback)
{
	console.log('File-manager: List of documents');
	fs.readdir('./app/server/accounts/'+user, function (err, files) {
	  if (err) throw err;
	  console.log("Usr files: " + files);
	  callback(files);
	});
}