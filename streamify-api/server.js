const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/UserRoutes');

const app = express();
app.use(cors({"origin": `${process.env.FRONTEND_URL}`}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => console.log("Server Started"));