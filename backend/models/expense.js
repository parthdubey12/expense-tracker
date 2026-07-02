import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: [true, 'Transactional log ledger entry requires a positive value asset marker'],
    min: [0.01, 'Value ledger updates cannot be empty or negative']
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Housing', 'Healthcare', 'Miscellaneous']
  },
  description: { 
    type: String, 
    trim: true,
    maxLength: [200, 'Metadata constraints limited to 200 character ceiling limit']
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);