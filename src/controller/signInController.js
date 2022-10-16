import { response } from "../services/response.js";
import { db } from "../settings/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const signInController = (req, res) => {
    try {
        const { email } = req.body

        const sql = "SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + email + "'";

        db.query(sql, (error, rows, fields) => {
            if (error) {
                response(`Login error ${error}`, res, 400);
            }
            else if (!rows.length) {
                const userNotfound = { message: `Users does not exist with ${email}` };

                response(userNotfound, res, 400);
            } else {
                const rowArray = JSON.parse(JSON.stringify(rows));

                rowArray.map(({ id, email, password }) => {
                    const isPasswordMatched = bcrypt.compareSync(req.body.password, password);

                    if (isPasswordMatched) {
                        const expire = 600;
                        const token = jwt.sign({ id, email }, config.jwtKey, { expiresIn: expire });

                        const dataObj = {
                            message: `User can be logined ${email}`,
                            data: { token: `Bearer ${token}` }
                        }

                        response(dataObj, res);
                    } else {
                        const dataObj = {
                            message: `Invalid password`
                        }

                        response(dataObj, res, 401);
                    }
                })
            }
        })
    } catch (error) {
        response(error, res, 500);
    }
}