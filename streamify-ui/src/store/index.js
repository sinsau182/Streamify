import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance as axiosInstance } from '../utils/constants';
import axios from 'axios';


const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};



export const getGenres = createAsyncThunk("streamify/genres", async () => {

    const { data: { genres } } = await axiosInstance.get(`/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });

        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        }
    });
}

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results } } = await axiosInstance.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
}

export const fetchMovies = createAsyncThunk("streamify/trending", async ({ type }, thunkApi) => {
    const { streamify: { genres } } = thunkApi.getState();
    return getRawData(`/trending/${type}/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, genres, true);
});


export const fetchDataByGenre = createAsyncThunk("streamify/moviesByGenres", async ({ genre, type }, thunkApi) => {
    const { streamify: { genres } } = thunkApi.getState();
    return getRawData(`/discover/${type}/?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genre}`, genres);
});

export const getUserLikedMovies = createAsyncThunk("streamify/getLiked", async (email) => {
    const { data: { movies } } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/liked/${email}`);
    return movies;
});

export const removeMovieFromLiked = createAsyncThunk("streamify/deleteLiked", async ({ email, movieId }) => {
    const { data: { movies } } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/remove`,
        {
            email,
            movieId,
        });
    return movies;
});

const StreamifySlice = createSlice({
    name: "Streamify",
    initialState,
    reducers: {
        clearData: (state) => {
            state.movies = [];
            state.genresLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    },
});

export const store = configureStore({
    reducer: {
        streamify: StreamifySlice.reducer,
    }
});

export const { clearData } = StreamifySlice.actions;