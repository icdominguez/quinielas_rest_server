const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.teamPath = "/api/team"
        this.leaguePath = "/api/league"
        this.connectDatabase()
        this.middlewares()
        this.routes()
    }

    async connectDatabase() {
        await dbConnection()
    }

    routes() {
        this.app.use(this.teamPath, require('../routes/team'))
        this.app.use(this.leaguePath, require('../routes/league'))
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
        this.app.use(cors())
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`CORS-enabled web server listening on port: ${this.port}`)
        })
    }
}

module.exports = Server