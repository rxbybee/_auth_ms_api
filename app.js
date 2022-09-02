import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import logger from 'morgan';

dotenv.config();

const PORT = process.env.PORT;
const LOG_FORMAT = process.env.LOG_FORMAT;
const ALLOWED_HEADERS = process.env.ALLOWED_HEADERS;

const app = express();
app.use(cors({
    origin: '*',  // FIXME: specify exact origins per environment
    methods: ['GET','HEAD'],
    allowedHeaders: ALLOWED_HEADERS
}));
app.use(logger(LOG_FORMAT));
app.use('/api/auth/v1', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(PORT, () => console.log(`auth ms api started on ${PORT}...`));
