#DocuFast

* Install needed packages (*pdflatex* and *mongodb*):
~~~~~~~~~~~~~~~~~~~~~
sudo apt-get install pdflatex
sudo apt-get install mongodb
~~~~~~~~~~~~~~~~~~~~~
* Clone repo:  `git clone https://github.com/dgrmunch/docufast.git` 
* Install dependencies in cloned repo:
~~~~~~~~~~~~~~~~~~~~~
cd docufast
npm install
~~~~~~~~~~~~~~~~~~~~~
* Run mongodb:
~~~~~~~~~~~~~~~~~~~~~
sudo mongod
~~~~~~~~~~~~~~~~~~~~~
* Run the app:
~~~~~~~~~~~~~~~~~~~~~
sudo node server.js
~~~~~~~~~~~~~~~~~~~~~
* Run in a browser: [http://localhost:5000](http://localhost:5000)

####DocuFast is built on:

* [Node-Login](http:////github.com/braitsch/node-login) - Node.js Login Framework
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [MongoDb](http://www.mongodb.org/) - Database Storage
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [Stylus](http://learnboost.github.com/stylus/) - CSS Preprocessor
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library

By Diego Gonzalez | [xmunch.net](http://www.xmunch.com)
