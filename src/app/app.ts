import express from 'express'
import cors from 'cors'

import movieRouter from './routes/moviesRoutes.js';
import providerRouter from './routes/providersRoutes.js';
import authentificationRouter from './routes/authentificationRoutes.js';
import groupRouter from './routes/groupsRoutes.js';

import cookieParser from 'cookie-parser';
import settingsRouter from './routes/settingRoutes.js';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use("/groups", groupRouter);
app.use("/movies", movieRouter);
app.use("/providers", providerRouter);
app.use("/", authentificationRouter);
app.use("/settings", settingsRouter)

export default app;