import { Request, Response } from 'express';
import * as resourceModel from '../models/resourceModel';

export const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const resource = await resourceModel.createResource(name, description);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;
    const resources = await resourceModel.getAllResources({ name: name as string });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getResourceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = await resourceModel.getResourceById(parseInt(req.params.id));
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const updatedResource = await resourceModel.updateResource(parseInt(req.params.id), name, description);
    res.status(200).json(updatedResource);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  try {
    await resourceModel.deleteResource(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
