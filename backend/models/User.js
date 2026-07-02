import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Identity registration requires a valid name component'] 
  },
  email: { 
    type: String, 
    required: [true, 'Communication and identity vector requires a unique email'], 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Cryptographic secure string passphrase is required'] 
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);