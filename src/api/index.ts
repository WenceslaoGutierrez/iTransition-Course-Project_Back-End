import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import templateRoutes from './template.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/templates', templateRoutes);

export default router;
