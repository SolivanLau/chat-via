import express from 'express';
import { configDotenv } from 'dotenv';
import firebaseRouter from './routes/firebase.js';
import notFoundMiddleware from './middlware/notFound.js';
import errorHandlerMiddleware from './middlware/errorHandler.js';

configDotenv();
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('testing');
});

app.use('/auth', firebaseRouter);

// NOT FOUND MIDDLEWARE
app.use(notFoundMiddleware);

// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

// APP INIT
const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});
