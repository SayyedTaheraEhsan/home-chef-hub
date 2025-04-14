// server.js
import express, { json } from 'express';
const app = express();
const PORT = 3000;
import userRoutes from './routes/users';

app.use(json()); // For parsing JSON request bodies
app.use('/api/users', userRoutes);

import favoriteRoutes from './routes/favorite';
app.use('/favorites', favoriteRoutes);

import feedbackRoutes from './routes/feedback';
app.use('/feedback', feedbackRoutes);

import recipeRoutes from './routes/recipe';
app.use('/recipes', recipeRoutes);

import recipeRoutes from './routes/recipe';
app.use('/recipes', recipeRoutes);

import suggestionRoutes from './routes/suggestions';
app.use('/suggestions', suggestionRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
