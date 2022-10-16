import passport from 'passport';
import { signUpController } from '../controller/signUpController.js';
import { signInController } from '../controller/signInController.js';
import { fileUploadController } from '../controller/fileUploadController.js';

export const routes = (app) => {
    app.route('/singup').post(signUpController);
    app.route('/singin').post(signInController);

    app.route('/file/upload').post(
        passport.authenticate('jwt', { session: false }),
        fileUploadController
    );
}