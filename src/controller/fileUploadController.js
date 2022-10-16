import { response } from "../services/response.js";
import { db } from '../settings/db.js';
import fs from "fs";

export const fileUploadController = (req, res) => {
    try {
        const { file } = req.files;
        const { name, size, mimetype } = file;

        fs.writeFile((`./uploads/${file.name}`), '', (error) => {
            if (error) {
                response('Cannot write file', res, 400)
            } else {
                const sql = "SELECT `name` FROM `files` WHERE `name` = '" + name + "'";

                db.query(sql, (error, rows, fields) => {
                    if (error) {
                        response(`Error in check existing file ${name}`, res, 400);
                    } else if (rows.length) {
                        response(file, res);
                    } else {
                        const stringDate = new Date().toISOString();
                        const sql = "INSERT INTO `files`(`type`, `size`, `date`, `name`) VALUES ('" + mimetype + "','" + size + "', '" + stringDate + "', '" + name + "')";

                        db.query(sql, (error, rows, field) => {
                            if (error) {
                                const errorText = `Cannot write file ${name} to data base ${error}`
                                response(errorText, res, 400);
                            }
                            response(file, res);
                        })
                    }
                })
            }
        })
    }
    catch (error) {
        const uploadError = `Upload error ${error}`
        response(uploadError, res, 500)
    }
}