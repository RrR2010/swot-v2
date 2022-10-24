import express from 'express'

import * as projectController from '../../controllers/projectController'
import { HTTPError, ERRORS } from '../../types/errors';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { loggedUserId } = req.body;
  const projects = await projectController.getFromUser(loggedUserId);
  if (projects instanceof HTTPError) { next(projects); return; }
  return res.status(200).json(projects);
});

router.get('/:id', async (req, res, next) => {
  const { loggedUserId } = req.body;
  const project = await projectController.getById(req.params.id, loggedUserId);
  if (project instanceof HTTPError) { next(project); return; }
  return res.status(200).json(project);
});

router.post('/create', async (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) { next(new ERRORS.MissingBodyParametersError('name')); return };

  const project = await projectController.create(req.body.name, req.body.loggedUserId)
  if (project instanceof HTTPError) { next(project); return }

  return res.json(project)
});

export default router;