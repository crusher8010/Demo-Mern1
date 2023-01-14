const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./Routes/userRoutes');
const movieRouter = require('./Routes/movieRoutes');

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
const port = 8000;

app.use(cors({
    origin: "*"
}))

app.use('/', userRouter);
app.use('/movies', movieRouter);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('Data connection formed...'))
    .catch((err) => console.log('No Connection....'))

app.listen(port, () => {
    console.log(`Server is running on ${port}...`)
})