import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import MovieLoader from './MovieLoader';
import fetchMovies from '../api/FetchAPI';

const Movies = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to fetch movies on button click or Enter key
  const handleSearch = async () => {
    if (!query.trim()) return; // Don't fetch if input is empty
    setLoading(true);
    const data = await fetchMovies(query);
    setMovies(data);
    setLoading(false);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={darkMode ? 'dark' : ''}>
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-6 text-center">🎬 Movies Hub</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 w-full max-w-md rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center mt-20">
              <MovieLoader />
            </div>
          ) : movies.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No movies found.
            </p>
          ) : (
            // Movie Cards Grid
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={() => navigate(`/movies/${movie.imdbID}`)}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition cursor-pointer"
                >
                  <img
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{movie.Title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Year: {movie.Year}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Type: {movie.Type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </section>
    </section>
  );
};

export default Movies;
