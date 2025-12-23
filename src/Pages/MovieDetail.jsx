import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import { fetchMovieByID } from '../api/FetchAPI';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      const data = await fetchMovieByID(imdbID);
      setMovie(data);
      setLoading(false);
    };
    getMovie();
  }, [imdbID]);

  if (loading) {
    return (
      <section className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <Loader />
        </div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Movie not found
        </p>
      </section>
    );
  }

  return (
    <section className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Poster */}
          <div className="relative group">
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/400x600?text=No+Image'
              }
              alt={movie.Title}
              className="rounded-3xl shadow-xl w-full h-auto object-cover transform transition group-hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">{movie.Title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {movie.Plot}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow">
                Year: {movie.Year}
              </span>
              <span className="px-4 py-2 bg-green-500 text-white rounded-2xl shadow">
                Rated: {movie.Rated}
              </span>
              <span className="px-4 py-2 bg-purple-500 text-white rounded-2xl shadow">
                Genre: {movie.Genre}
              </span>
              <span className="px-4 py-2 bg-pink-500 text-white rounded-2xl shadow">
                Runtime: {movie.Runtime}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Director:</span>{' '}
                {movie.Director}
              </p>
              <p>
                <span className="font-semibold">Writer:</span> {movie.Writer}
              </p>
              <p>
                <span className="font-semibold">Actors:</span> {movie.Actors}
              </p>
              <p>
                <span className="font-semibold">Language:</span>{' '}
                {movie.Language}
              </p>
            </div>

            <button
              onClick={() => window.history.back()}
              className="mt-8 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition w-fit"
            >
              ← Back to Movies
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </section>
  );
};

export default MovieDetail;
