import express from 'express'
import cors from 'cors'

import movieRouter from './routes/moviesRoutes.js';
import providerRouter from './routes/providersRouters.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/movies", movieRouter);
app.use("/providers", providerRouter);


export default app;