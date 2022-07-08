import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import { APILogger } from "./lib/logger/api.logger";
import swaggerUi = require('swagger-ui-express');
import routes from "./routes/index";
import { ControllerError } from "./lib/exceptions/controller_exception";
import { connect } from "./config/db.config";
import fileUpload = require("express-fileupload");

class App {

    public express: express.Application;
    public logger: APILogger;

    /* Swagger files start */
    // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    // private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        connect();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
        this.express.use(fileUpload());
    }

    private routes(): void {
        routes.forEach((route) => {
            this.express[route.method](route.path, ...(route.middleware || []), (req, res) => {
                route.handler(req)
                    .then(data => res.json(data))
                    .catch((e: ControllerError) => {
                        console.log(e)
                        res.status(e.status).json({ message: e.message });
                    })
            })
        })

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // swagger docs
        //this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;