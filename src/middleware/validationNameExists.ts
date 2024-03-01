import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";

export const validationNameExists = async (req: Request, res: Response, next: NextFunction) => {
    const query = format(`SELECT * FROM movies WHERE name = %L;`, req.body.name);

    const data = await client.query(query);

    if (data.rows[0]) {
        return res.status(409).json({ message: "Movie name already exists!" });
    };

    next();
};