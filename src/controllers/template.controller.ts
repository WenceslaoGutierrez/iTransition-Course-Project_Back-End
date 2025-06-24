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
