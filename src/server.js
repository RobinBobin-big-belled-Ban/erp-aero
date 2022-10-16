import express from "express";
import bodyParser from 'body-parser';
import passport from 'passport';
import { routes } from './settings/routes.js';
import { linkJwtPassport } from './middlewares/passport.js';
import fileUpload from 'express-fileupload';
import { cors } from './middlewares/cors.js';

const app = express();
const port = 3500;

app.use(fileUpload({}));
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
linkJwtPassport(passport);

routes(app);

app.listen(port, () => {
    console.log(`App successefuly started on port ${port}`);
});