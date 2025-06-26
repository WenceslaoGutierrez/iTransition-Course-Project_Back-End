import { Router } from 'express';
import { validate } from '../middleware/genericValidate.middleware';
import { createTemplateSchema } from '../schemas/template.schema';
import { protect } from '../middleware/auth.middleware';
import * as templateController from '../controllers/template.controller';
import { validateAndLoadTemplate } from '../middleware/template.middleware';

const router = Router();
router.use(protect);

router.route('/').post(validate(createTemplateSchema), templateController.createTemplate).get(templateController.getMyTemplates);

router
  .route('/:id')
  .get(validateAndLoadTemplate, templateController.getTemplateById)
  .put(validateAndLoadTemplate, templateController.updateTemplate)
  .delete(validateAndLoadTemplate, templateController.deleteTemplate);

export default router;
