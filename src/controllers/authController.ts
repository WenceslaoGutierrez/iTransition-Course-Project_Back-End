import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { User } from '../generated/prisma';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await authService.findUserByEmail(req.body.email);
    if (existingUser) return res.status(409).json({ message: req.t('auth.email_in_use') });
    const newUser = await authService.registrationProcess(req.body);
    res.status(201).json({ message: req.t('auth.register_success'), user: newUser });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: req.t('error.server_error') });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.authenticateUser(req.body);
    if (!user) return res.status(401).json({ message: req.t('auth.login_failed') });
    const responseData = authService.loginResponse(user);
    res.status(200).json({ message: req.t('auth.login_success'), ...responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error.server_error') });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.status(200).json({ message: req.t('auth.logout_success') });
};
