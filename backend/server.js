import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
const port = process.env.port || 5000;

const mockUsers = [
  { id: 1, username: 'negin1', displayName: 'Negin1' },
  { id: 2, username: 'negin2', displayName: 'Negin2' },
  { id: 3, username: 'negin3', displayName: 'Negin3' },
];

connectDB();

// set up express server
const app = express();

// accept json as the body for the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send({ msg: 'Hello Client' });
});

// all users
app.get('/api/users', (request, response) => {
  response.send(mockUsers);
});

// one user
app.get('/api/users/:id', (request, response) => {
  console.log(request.params);
});

app.get('/api/products', (request, response) => {
  response.send([{ id: 1, name: 'chicken', price: 12.99 }]);
});

// all routes for one specific model
app.use('/api/goals', goalRoutes);
// app.use('/api/users', userRoutes);

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
  // Get __filename
  const __filename = fileURLToPath(import.meta.url);

  // Get __dirname
  const __dirname = path.dirname(__filename);

  // create our static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // point any route aside from the
  // html routes to the index.html
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('You are not in production mode'));
}

// global error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
