import express from 'express';
import { configDotenv } from 'dotenv';
import 'express-async-errors';
// ROUTES
import firebaseRouter from './routes/firebase.js';
import dbRouter from './routes/db.js';
// MIDDLEWARE
import cors, { CorsOptions } from 'cors';
import notFoundMiddleware from './middleware/notFound.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import { checkDatabaseConnection } from './dbConfig.js';

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
app.use('/api/db', dbRouter);

// NOT FOUND MIDDLEWARE
app.use(notFoundMiddleware);

// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

// APP INIT
const port = process.env.PORT || '3000';

const startApp = async () => {
  try {
    checkDatabaseConnection();
    app.listen(port, () => {
      console.log(`app is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
