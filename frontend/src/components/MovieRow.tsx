import React from "react";

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
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

const MovieRow: React.FC<Props> = ({ movie, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="p-3">{movie.title}</td>
      <td className="p-3">{movie.type}</td>
      <td className="p-3">{movie.director}</td>
      <td className="p-3">{movie.budget}</td>
      <td className="p-3">{movie.location}</td>
      <td className="p-3">{movie.duration}</td>
      <td className="p-3">{movie.yearTime}</td>
      <td className="p-3 text-right">
        <button
          onClick={() => onEdit(movie)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;
