import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

const MONGO_URI = 'mongodb://127.0.0.1:27017/demo_ts';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
