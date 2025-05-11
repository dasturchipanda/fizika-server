import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.JWT_SECRET;

// JWT yaratish funksiyasi
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      role: user.user_role,
    },
    secret_key,
    { expiresIn: '30d' }
  );
};

// JWT ni tekshirish funksiyasi
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret_key);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
