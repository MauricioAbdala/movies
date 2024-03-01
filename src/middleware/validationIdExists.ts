import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

export const validationIdExists = async ( req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM movies WHERE id = $1`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    };

    const query = await client.query(queryConfig);

    if (query.rowCount === 0) {
        return res.status(404).json({ message: "Movie not found!" })
    };

    res.locals.movie = query.rows[0];

    return next();
};