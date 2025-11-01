"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovies = exports.createMovie = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const movieValidation_1 = require("../validations/movieValidation");
// ➕ Add new movie/show
const createMovie = async (req, res) => {
    try {
        const validated = movieValidation_1.movieSchema.parse(req.body);
        const movie = await client_1.default.movie.create({ data: validated });
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createMovie = createMovie;
// 📄 Get all movies with pagination
const getMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const movies = await client_1.default.movie.findMany({
            skip,
            take: limit,
            orderBy: { id: "desc" },
        });
        res.json({ page, limit, movies });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};
exports.getMovies = getMovies;
// ✏️ Update a movie
const updateMovie = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const validated = movieValidation_1.movieSchema.parse(req.body);
        const movie = await client_1.default.movie.update({
            where: { id },
            data: validated,
        });
        res.json(movie);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateMovie = updateMovie;
// 🗑️ Delete a movie
const deleteMovie = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client_1.default.movie.delete({ where: { id } });
        res.json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete movie" });
    }
};
exports.deleteMovie = deleteMovie;
