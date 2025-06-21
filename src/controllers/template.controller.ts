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
