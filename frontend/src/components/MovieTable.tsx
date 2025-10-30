import React, { useEffect, useState } from "react";
import api from "../services/api";
import MovieRow from "./MovieRow";

interface Movie {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
}

interface Props {
  refresh: boolean;
  onEdit: (movie: Movie) => void;
}

const MovieTable: React.FC<Props> = ({ refresh, onEdit }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get(`/movies?page=${page}&limit=10`);
      const newMovies = res.data.movies;
      setMovies((prev) => [...prev, ...newMovies]);
      setHasMore(newMovies.length > 0);
      setPage(page + 1);
    } catch {
      alert("Failed to load movies");
    }
    setLoading(false);
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies();
  }, [refresh]);

  useEffect(() => {
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movies?page=1&limit=${page * 10}`);
      setMovies(res.data.movies);
    } catch {
      alert("Failed to refresh movies");
    }
    setLoading(false);
  };

  fetchMovies();
  // Reset scroll state
  setPage(1);
  setHasMore(true);
}, [refresh]);


  const handleDelete = async (id: number) => {
    if (confirm("Delete this movie?")) {
      await api.delete(`/movies/${id}`);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Director</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Year/Time</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <MovieRow
              key={movie.id}
              movie={movie}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}
      {!hasMore && (
        <p className="p-4 text-center text-gray-400">No more records</p>
      )}
    </div>
  );
};

export default MovieTable;
