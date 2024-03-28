const User = require("../models/UserModel");

const addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));

            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    {
                        new: true
                    }
                );
            } else {
                return res.json({ message: "Movie already added to the liked list." });
            }
        } else {
            await User.create({ email, likedMovies: [data] });
        }

        return res.json({ message: "Movie added Successfully." });
    } catch (error) {
        return res.json({ message: "Error adding movie" });
    }
}

const getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ msg: "success", movies: user.likedMovies });
        } else {
            return res.json({ msg: "User with given Email not found" });
        }
    } catch (err) {
        return res.json({ msg: "Error adding movie" });
    }
}

const removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const movies = user.likedMovies;
            const movieIndex = movies.findIndex(({ id }) => id === movieId);

            if (!movieIndex && movieIndex !== 0) {
                return res.status(400).json({ message: "Movie not found" });
            }

            movies.splice(movieIndex, 1);

            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies: movies,
                },
                {
                    new: true
                }
            );
            return res.json({ msg: "Movie deleted", movies });
        } else {
            return res.json({ msg: "User with given email not found." });
        }
    } catch (err) {
        return res.json({ msg: "Error deleting movie" });
    }
}

module.exports = {
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies
};