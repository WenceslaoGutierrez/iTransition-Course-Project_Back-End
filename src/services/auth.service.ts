import { PrismaClient, User } from '../generated/prisma/client';
import bcrypt from 'bcrypt';

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

export const generateToken = (user: User) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '10m' });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const prepareUserResponse = (user: User) => {
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
