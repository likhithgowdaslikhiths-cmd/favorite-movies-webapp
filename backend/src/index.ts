import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://favorite-movies-webapp.vercel.app"
}));
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("🎬 Favorite Movies API is running successfully!");
});

// Movie API routes
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
