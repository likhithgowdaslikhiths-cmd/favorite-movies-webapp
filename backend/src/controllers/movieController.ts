import { Request, Response } from "express";
import prisma from "../prisma/client";
import { movieSchema } from "../validations/movieValidation";

// ➕ Add new movie/show
export const createMovie = async (req: Request, res: Response) => {
  try {
    const validated = movieSchema.parse(req.body);
    const movie = await prisma.movie.create({ data: validated });
    res.status(201).json(movie);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// 📄 Get all movies with pagination
export const getMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const movies = await prisma.movie.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });

    res.json({ page, limit, movies });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// ✏️ Update a movie
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validated = movieSchema.parse(req.body);
    const movie = await prisma.movie.update({
      where: { id },
      data: validated,
    });
    res.json(movie);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// 🗑️ Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.movie.delete({ where: { id } });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
};
