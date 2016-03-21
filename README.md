# betaprod

## Stack

### Client side
We are using webpack as the mobule bundler, so you need to require the modules you are using in client side javascript, no globals.
Also we using babel to compile ES6 code to ES5 (javscript).

* Angular
* Angular Material for material design

### Server Side
Node.js v5 with Express.

* Passport for authentication with facebook
* Thinky - ORM to RethinkDB
* Winston for logging

### Database
We are using RethinkDB database

## Github
We are using Pull Request model, so no one commit directly to the main repository.
Also no-one should merge is own commits.

## Setup development environment

1. Download and install git
2. Download and install NodeJS v5.x (https://nodejs.org/en/)
3. Install RethinkDB and start locally (https://www.rethinkdb.com/docs/install/)
4. Go and fork the project (big fork button on the top-right)
5. Open terminal, go to project directory and run 'git clone https://github.com/YOURUSERNAME/betaprod.git' replace YOURUSERNAME with your github username
6. Enter the new project folder(betaprod) and run 'npm install' to install all dependencies
7. Run 'npm start' to start the project
8. Open browser and navigate to 'http://localhost:3001'

 

