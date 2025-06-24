import { Router } from 'express';
import { validate } from '../middleware/genericValidate.middleware';
import { createTemplateSchema } from '../schemas/template.schema';
import { protect } from '../middleware/auth.middleware';
import * as templateController from '../controllers/template.controller';

const router = Router();
router.use(protect);

//TO DO
//CREATE (POST)
//READ (GET)
//DELETE()
//UPDATE()
