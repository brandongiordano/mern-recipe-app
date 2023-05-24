import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/userRoutes.js';
// import { recipeRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
// app.use('/recipes', recipeRouter);

mongoose.connect(
  'mongodb+srv://bgiordano9917:MernPassword123@recipes.vyby9xa.mongodb.net/recipes?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log('Server started'));