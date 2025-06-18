import { Router } from 'express';
import { validate } from '../middleware/genericValidate.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(registerSchema), authController.registerUser);
router.post('/login', validate(loginSchema), authController.loginUser);
