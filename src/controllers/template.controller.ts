import { Request, Response } from 'express';
import * as templateService from '../services/template.service';

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const authorId = req.user!.id;
    const newTemplate = await templateService.createTemplate(req.body, authorId);
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: req.t('error.server_error') });
  }
};

//READ

export const getMyTemplates = async (req: Request, res: Response) => {
  try {
    const authorId = req.user!.id;
    const templates = await templateService.getTemplatesByAuthor(authorId);
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error.server_error') });
  }
};

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const templateId = parseInt(req.params.id, 10);
    if (isNaN(templateId)) return res.status(400).json({ message: req.t('validation.invalid_id') });
    const template = await templateService.findTemplateByIdForUser(templateId, req.user);
    if (!template) return res.status(404).json({ message: req.t('error.template_not_found') });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: req.t('error.server_error') });
  }
};
