import express from 'express'
import cors from 'cors'

import movieRouter from './routes/moviesRoutes.js';
import providerRouter from './routes/providersRouters.js';
import authentificationRouter from './routes/authentificationRoutes.js';

import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use("/movies", movieRouter);
app.use("/providers", providerRouter);
app.use("/", authentificationRouter);

export default app;