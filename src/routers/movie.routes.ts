import { Router } from "express";
import { createMovies, deleteMovie, getAllMovies, getIdMovie, updatePartialMovie } from "../logic";
import { validationNameExists } from "../middleware/validationNameExists";
import { validationIdExists } from "../middleware/validationIdExists";



export const movieRoutes = Router();

movieRoutes.get("/:id", validationIdExists, getIdMovie);
movieRoutes.get("/", getAllMovies);
movieRoutes.post("/", validationNameExists, createMovies);
movieRoutes.delete("/:id", validationIdExists, deleteMovie);
movieRoutes.patch("/:id", validationIdExists, validationNameExists, updatePartialMovie);