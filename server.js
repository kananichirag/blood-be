const express = require('express');
const app = express();
const dontenv = require('dotenv');
const Routes = require('./routes/authRoutes');
const mongoose = require('mongoose');
dontenv.config();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB connected...')).catch((err) => console.log(err));