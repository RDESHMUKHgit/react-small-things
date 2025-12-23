// src/api/FetchAPI.jsx
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_OMDB_URL;
const API_KEY = import.meta.env.VITE_OMDB_KEY;

const fetchMovies = async (query = 'avengers') => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'movie',
      },
    });
    return data.Search || [];
  } catch (error) {
    console.error('OMDb API Error:', error.message);
    return [];
  }
};

export default fetchMovies;

export const fetchMovieByID = async (imdbID) => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    return data || null;
  } catch (error) {
    console.error('OMDb API Error:', error.message);
    return null;
  }
};
