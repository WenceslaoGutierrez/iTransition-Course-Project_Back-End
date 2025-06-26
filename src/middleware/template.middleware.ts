import { Request, Response, NextFunction } from 'express';
import * as templateService from '../services/template.service';

export const validateAndLoadTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const templateId = parseInt(req.params.id, 10);
    if (isNaN(templateId)) {
      res.status(400).json({ message: req.t('validation.invalid_id') });
      return;
    }

    const template = await templateService.findTemplateByIdForUser(templateId, req.user);
    if (!template) {
      res.status(404).json({ message: req.t('error.template_not_found') });
      return;
    }
    req.template = template;
    next();
  } catch (error) {
    console.error(`Error en el middleware validateAndLoadTemplate: ${error}`);
    res.status(500).json({ message: req.t('error.server_error') });
  }
};
