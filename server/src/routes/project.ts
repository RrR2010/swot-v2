import express from 'express'

import * as projectController from '../controllers/projectController'
import { BaseError, MissingBodyParametersError } from '../types/errors';

const router = express.Router();

router.post('/create', async (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) { next(new MissingBodyParametersError('name')); return };

  const project = await projectController.create(req.body.name, "cfe0304a-00c1-489f-993e-1825a1e26852")
  if (project instanceof BaseError) { next(project); return }

  console.log("Avançou")

  return res.json(project)
});

router.get('/', async (req, res, next) => {
  const projects = await projectController.getAll();
  if (projects instanceof Error) { next(projects); return; }
  return res.status(200).json(projects);
});

router.get('/:id', async (req, res, next) => {
  const project = await projectController.getById(req.params.id);
  if (project instanceof Error) { next(project); return; }
  if (project instanceof Error) { return res.status(401).json(project); }
  return res.status(200).json(project);
});

export default router;