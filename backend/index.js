import express from 'express';

import connectDB from './utils/connectDB.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import followRoutes from './routes/follow.js';
import subgreddiitRoutes from './routes/subgreddiit.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/subgreddiit', subgreddiitRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
