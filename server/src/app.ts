import express from 'express';
import { configDotenv } from 'dotenv';
import 'express-async-errors';
// ROUTES
import firebaseRouter from './routes/firebase.js';
// MIDDLEWARE
import cors, { CorsOptions } from 'cors';
import notFoundMiddleware from './middlware/notFound.js';
import errorHandlerMiddleware from './middlware/errorHandler.js';

configDotenv();
const app = express();

// MIDDLEWARE
// CORS OPTIONS
const corsOptions = {
  origin: [process.env.CLIENT_DEV_SERVER || 'http://localhost:5173'],
};
app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('testing');
});
app.get('/api', (req, res) => {
  res.send('/api route!');
});
app.use('/api/auth', firebaseRouter);

// NOT FOUND MIDDLEWARE
app.use(notFoundMiddleware);

// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

// APP INIT
const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});
