import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";

export const getIdMovie = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals.movie);
};

export const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
    let query = 'SELECT * FROM movies';

    if (req.query.category) {
        query += ` WHERE category ILIKE $1`;
    };

    try {
        const data: QueryResult = await client.query(query, req.query.category ? [req.query.category] : []);

        if (req.query.category && data.rows.length === 0) {
            const allMoviesQuery = 'SELECT * FROM movies';
            const allMoviesData: QueryResult = await client.query(allMoviesQuery);
            
            return res.status(200).json(allMoviesData.rows);
        };

        return res.status(200).json(data.rows);
    } catch (error) {
        console.error('Error while searching for movies:', error);
        return res.status(500).json({ message: 'Error while searching for movies.' });
    };
};

export const createMovies = async (req: Request, res: Response): Promise<Response> => {
    const queryString = `INSERT INTO movies (name, category, duration, price)
    VALUES ($1, $2, $3, $4 )
    RETURNING *;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.name, req.body.category, req.body.duration, req.body.price]
    };

    const query = await client.query(queryConfig)

    return res.status(201).json(query.rows[0]);
};

export const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    const query = format(`DELETE FROM movies WHERE id = %L;`, req.params.id);

    await client.query(query);

    return res.status(204).json();
};

export const updatePartialMovie = async (req: Request, res: Response): Promise<Response> => {
    const queryConfig = format(`
        UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;
    `, Object.keys(req.body), Object.values(req.body), req.params.id);

    const query = await client.query(queryConfig);

    return res.status(200).json(query.rows[0]);
};
