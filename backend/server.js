import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);
const app = express();

// Global Middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Database Gateway
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 Database Engine Connection Established Successfully'))
  .catch(err => console.error('🛑 Database Connection Failure Stack:', err));

// Route Mounting Points
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Global Catch-All Fallback Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal Server Structural Disruption' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[ONLINE RECON] System listening natively on port: ${PORT}`));