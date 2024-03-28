import axios from 'axios';

export const TMDB_BASE_URL = 'http://api.themoviedb.org/3';

export const instance = axios.create({
  baseURL: TMDB_BASE_URL
});
