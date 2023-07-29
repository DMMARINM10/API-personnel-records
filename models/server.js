
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.jobsPath = '/api/jobs';

        //DB Connection
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }
    
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors ());

        //Body parse
        this.app.use( express.json());

        //Public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.js'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.jobsPath, require('../routes/jobs'));
    }
    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port', this.port);
        });
    }
}

module.exports = Server;

 
