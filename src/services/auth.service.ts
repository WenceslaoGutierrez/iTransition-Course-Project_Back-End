import { create } from 'domain';
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

export const createUser = async (data: Omit<User, 'id' | 'role' | 'isBlocked'>) => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const registrationProcess = async (userData: Omit<User, 'id' | 'role' | 'isBlocked'>) => {
  const hashedPassword = await hashPassword(userData.password_hash);
  const newUser = await createUser({ ...userData, password_hash: hashedPassword });
  return prepareUserResponse(newUser);
};

export const authenticateUser = async (credentials: Pick<User, 'email' | 'password_hash'>) => {
  const user = await findUserByEmail(credentials.email);
  if (!user) return null;
  const isPasswordCorrect = await verifyPassword(credentials.password_hash, user.password_hash);
  if (!isPasswordCorrect) return null;
  return user;
};

export const loginResponse = (user: User) => {
  const token = generateToken(user);
  const userResponse = prepareUserResponse(user);
  return { token, user: userResponse };
};
