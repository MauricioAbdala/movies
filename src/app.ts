import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDatabase } from "./database";
import { movieRoutes } from "./routers/movie.routes";


const app = express();

app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Test Ok" });
});

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    connectDatabase();
});