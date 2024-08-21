const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.port || 5000;

connectDB();

// set up express server
const app = express();

// accept json as the body for the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// all routes for one specific model
app.use('/goals', require('./routes/goalRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
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
