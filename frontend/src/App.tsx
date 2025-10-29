import React, { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieTable from "./components/MovieTable";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingMovie, setEditingMovie] = useState<any>(null);

  const reload = () => setRefreshFlag((s) => !s);

  const handleAddClick = () => {
    setEditingMovie(null);
    setShowForm((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEdit = (m: any) => {
    setEditingMovie(m);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white flex justify-center items-center gap-3">
            🎬 Favorite Movies & TV Shows
          </h1>
          <p className="text-blue-100 mt-2 text-sm md:text-base">
            Manage your favorite movies and shows easily.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form ✖" : "➕ Add New Movie / Show"}
          </button>
        </div>

        {/* Form - only show when user clicks Add */}
        {showForm && (
          <div className="flex justify-center">
            <MovieForm
              onSuccess={reload}
              editingMovie={editingMovie}
              onCancelEdit={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Table */}
        <section className="mt-8">
          <MovieTable refresh={refreshFlag} onEdit={startEdit} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-slate-500">
        Built with Likhith Gowda S
      </footer>
    </div>
  );
};

export default App;
