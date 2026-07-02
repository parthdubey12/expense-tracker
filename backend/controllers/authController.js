import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const issueToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All record processing fields are mandatory' });
    }

    const collisionCheck = await User.findOne({ email });
    if (collisionCheck) return res.status(400).json({ message: 'Identity vector signature already allocated' });

    const salt = await bcrypt.genSalt(12);
    const hashSignature = await bcrypt.hash(password, salt);

    const newUserInstance = await User.create({ name, email, password: hashSignature });
    
    res.status(201).json({
      _id: newUserInstance._id,
      name: newUserInstance.name,
      email: newUserInstance.email,
      token: issueToken(newUserInstance._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Database structural instance creation crash' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trackingIdentity = await User.findOne({ email });

    if (trackingIdentity && (await bcrypt.compare(password, trackingIdentity.password))) {
      res.json({
        _id: trackingIdentity._id,
        name: trackingIdentity.name,
        email: trackingIdentity.email,
        token: issueToken(trackingIdentity._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid administrative credential pairing matches' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Authentication processing sequence interrupted' });
  }
};