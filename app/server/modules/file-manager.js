var fs = require('fs');
var exec = require('exec');

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

exports.movePDFsToUserAccountDir = function(nameDoc, pathDoc, user, callback){

	console.log('File-manager: movePDFsToUserAccountDir');
	var from = './' + pathDoc;
	var to = './app/server/accounts/'+ user +'/'+nameDoc;
	console.log('From "'+from+'" to "'+to);
	fs.rename(from, to, function(err) {
        if (err) throw err;
        console.log('Delete temp');
        fs.unlink(from, function() {
            if (err) throw err;
        });
    });
}

exports.compileDocument = function(documents,user,callback){
	var i = 0;
	var beginDocument = '\\documentclass{article}\n' +
						'\\usepackage{pdfpages}\n ' +
						'\\begin{document}\n';
	var endDocument = '\\end{document}';
	var latexContent = '';

	while(i < documents.length){
		console.log(latexContent);
		latexContent = latexContent + '\n\\includepdf[pages={'+documents[i][1]+'-'+documents[i][2]+'}]{app/server/accounts/'+ user +'/'+documents[i][0]+'}\n';
		i++;
	}
	
	var fileToWrite = 'app/server/accounts/'+ user +'/'+user+'.tex';
	var content =  beginDocument + '\n' + latexContent + '\n' + endDocument;
	console.log(fileToWrite);
	console.log(content);
	
	fs.writeFile('./'+ fileToWrite,content, function (err) {
	        if (err) throw err;
			var command = "pdflatex -output-directory app/public/ 'app/server/accounts/"+ user +"/"+user+".tex'";
	        console.log('Tex file generated and command executed: '+command);
			child = exec(command, function(error, stdout, stderr) {
				console.log('out');
				callback();
			});
	    });
		console.log('end.....');
		
	
}