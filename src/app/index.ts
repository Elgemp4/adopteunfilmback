import express from 'express'
import cors from 'cors'

import movieRouter from './routes/movies.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/movies", movieRouter);


export default app;