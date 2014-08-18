var express = require('express');
var http = require('http');
var app = express();
var info = require('./app/conf/info');
var texts = require('./app/conf/texts');

app.configure(function(){
	
	app.set(info.PARAM_PORT, info.PORT);
	app.set(info.PARAM_VIEWS, __dirname + info.DIR_VIEWS);
	app.set(info.PARAM_VIEW_ENGINE, info.VIEW_ENGINE);
	
	app.locals.pretty = true;
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: "./app/server/uploads" })); 
	app.use(express.cookieParser());
	app.use(express.session({ secret: info.SECRET }));
	app.use(express.methodOverride());
	app.use(require(info.PARAM_STYLUS).middleware({ src: __dirname + info.DIR_PUBLIC }));
	app.use(express.static(__dirname + info.DIR_PUBLIC));
});

app.configure(info.DEVELOPMENT, function(){
	app.use(express.errorHandler());
});

require(info.DIR_ROUTER)(app);

http.createServer(app).listen(app.get(info.PARAM_PORT), function(){
	console.log(texts.EXPRESS_LISTENING + app.get(info.PARAM_PORT));
})