import { Request, Response, NextFunction } from 'express';
import * as templateService from '../services/template.service';

export const validateAndLoadTemplate = async (req: Request, res: Response, next: NextFunction) => {
  const templateId = parseInt(req.params.id, 10);
  if (isNaN(templateId)) return res.status(400).json({ message: req.t('validation.invalid_id') });
  const template = await templateService.findTemplateByIdForUser(templateId, req.user);
  if (!template) return res.status(404).json({ message: req.t('error.template_not_found') });
  req.template = template;
  next();
};
