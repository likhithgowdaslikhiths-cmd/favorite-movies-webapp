import React, { useState, useEffect } from "react";
import api from "../services/api";

interface Movie {
  id?: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
}

interface Props {
  onSuccess: () => void;
  editingMovie?: Movie | null;
  onCancelEdit?: () => void;
}

const MovieForm: React.FC<Props> = ({ onSuccess, editingMovie, onCancelEdit }) => {
  const [movie, setMovie] = useState<Movie>({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
  });

  useEffect(() => {
    if (editingMovie) setMovie(editingMovie);
  }, [editingMovie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMovie) await api.put(`/movies/${editingMovie.id}`, movie);
      else await api.post("/movies", movie);

      setMovie({
        title: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        yearTime: "",
      });
      onSuccess();
      if (onCancelEdit) onCancelEdit();
    } catch {
      alert("❌ Failed to save movie");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-200 transition hover:shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingMovie ? "✏️ Edit Movie/Show" : "➕ Add New Movie/Show"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={movie.title} onChange={handleChange} placeholder="Title" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
        <select name="type" value={movie.type} onChange={handleChange} className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
        <input name="director" value={movie.director} onChange={handleChange} placeholder="Director" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="budget" value={movie.budget} onChange={handleChange} placeholder="Budget" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="location" value={movie.location} onChange={handleChange} placeholder="Location" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="duration" value={movie.duration} onChange={handleChange} placeholder="Duration" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="yearTime" value={movie.yearTime} onChange={handleChange} placeholder="Year/Time" className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {editingMovie && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingMovie ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
