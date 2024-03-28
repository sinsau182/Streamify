const mongoose = require( 'mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    likedMovies: Array,
});

module.exports= mongoose.model("User", userSchema);
