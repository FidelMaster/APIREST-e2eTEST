/*this file contain all config for the API*/
import { connect } from "../common/config/database";
import cors from 'cors'
import compression from 'compression'
import express, { Application, json } from 'express'
import helmet from 'helmet'
import passport from 'passport'
import passportMiddleware from '../api/middleware/passport';
import morgan from 'morgan'

// Routes
import authRoutes from "../api/routes/auth.routes";
import postsRoutes from "../api/routes/posts.routes";

export class App {

    private app: Application;
    private connection;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.connection = connect();
    }

    private middleware(): void {
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(passport.initialize())
        passport.use(passportMiddleware);
    }

    private routes() {
        this.app.use(authRoutes);
        this.app.use(postsRoutes);
    }

    public listen(port: number | string, cb: () => void): void {
        this.app.listen(port, cb)
    }
}