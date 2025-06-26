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
  res.status(200).json(req.template);
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const result = await templateService.updateTemplate(req.template!, req.body, req.user!);
    if (typeof result === 'string') {
      res.status(403).json({ message: req.t(result) });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: req.t('error.server_error') });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const result = await templateService.deleteTemplate(req.template!, req.user!);
    if (result) {
      res.status(403).json({ message: req.t(result) });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: req.t('error.server_error') });
  }
};
