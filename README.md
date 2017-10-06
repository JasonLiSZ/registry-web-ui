Registry Web UI
===================

A web UI for private Docker Registry v2 with SSL, password authendication.

## Features

The application boasts the following features:

 * View all images for specified registry
 
 * View all tags under each image

 * Delete specified tag

 * Stateless application
 
## Technologies

 * KOA

 * AngularJS

 * Bootstrap

 * Curl

## Demo

 * 1 install packages

	npm install

 * 2 adjust port

	adjust web port from ./web/app.js

	adjust service port from ./service/app.js

 * 3 run

	npm start

 * 4 host in pm2

	pm2 start ./bin/run
