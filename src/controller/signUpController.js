import { response } from "../services/response.js";
import { db } from "../settings/db.js";
import bcrypt from "bcryptjs";

export const signUpController = (req, res) => {
    try {
        const sql = "SELECT `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'"

        db.query(sql, (error, rows, field) => {
            console.log(rows);
            if (error) {
                response(error, res, 400);
            } else if (typeof rows !== 'undefined' && rows.length) {
                console.log(rows);
                const rowArray = JSON.parse(JSON.stringify(rows))
                rowArray.map(({ email }) => {
                    const dataObj = {
                        message: `Already exists ${email}`
                    }
                    response(dataObj, res, 302);
                })
            } else {
                const { email, password } = req.body;

                const salt = bcrypt.genSaltSync(15)
                const passwordHash = bcrypt.hashSync(password, salt)

                const sql = "INSERT INTO `users`(`email`, `password`) VALUES ('" + email + "','" + passwordHash + "')"

                db.query(sql, (error, resilts) => {
                    if (error) {
                        const errorString = `Add user error ${error}`;

                        response(errorString, res, 400);
                    } else {
                        const data = {
                            message: 'Registrations was succesfully',
                            resilts,
                        };
                        response(data, res);
                    }
                })
            }
        })
    } catch (error) {
        response(error, res, 500);
    }
}