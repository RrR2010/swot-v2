import express from 'express'

import * as projectController from '../controllers/projectController'
import { HTTPError, ERRORS } from '../interfaces/errors';

const router = express.Router();

/**
 *  @swagger
 *  /projects:
 *    get:
 *      summary: List of current user projects.
 *      description: Use this route to get the list of current logged user.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Projects
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *              examples:
 *                ListOfProjects:
 *                  $ref: '#/components/examples/ListOfProjects'
 *        400:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                GeneralError:
 *                  $ref: '#/components/errors/GeneralError'
 *        401:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                Unauthenticated:
 *                  $ref: '#/components/errors/Unauthenticated'
 */
router.get('/', async (req, res, next) => {
  const { loggedUserId } = req.body;
  const projects = await projectController.getFromUser(loggedUserId);
  if (projects instanceof HTTPError) { next(projects); return; }
  return res.status(200).json(projects);
});

/**
 *  @swagger
 *  /projects/{id}:
 *    get:
 *      summary: Get a project by id
 *      description: Use this route to get a project by an id.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Projects
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          example: 44be8dc2-ffc2-410e-893d-0aad4ed74bec
 *          required: true
 *          description: URID Project ID
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *              examples:
 *                Project:
 *                  $ref: '#/components/examples/Project'
 *        400:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                GeneralError:
 *                  $ref: '#/components/errors/GeneralError'
 *        401:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                Unauthenticated:
 *                  $ref: '#/components/errors/Unauthenticated'
 */
router.get('/:id', async (req, res, next) => {
  const { loggedUserId } = req.body;
  const project = await projectController.getById(req.params.id, loggedUserId);
  if (project instanceof HTTPError) { next(project); return; }
  return res.status(200).json(project);
});

/**
 *  @swagger
 *  /projects/create:
 *    post:
 *      summary: New project
 *      description: Use this route to create a new project.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Projects
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *            examples:
 *              CreateNewProject:
 *                $ref: '#/components/examples/CreateNewProject'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *              examples:
 *                NewProjectCreated:
 *                  $ref: '#/components/examples/NewProjectCreated'
 *        400:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                MissingBodyParameters:
 *                  $ref: '#/components/errors/MissingBodyParameters'
 *                GeneralError:
 *                  $ref: '#/components/errors/GeneralError'
 *        401:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HTTPError'
 *              examples:
 *                Unauthenticated:
 *                  $ref: '#/components/errors/Unauthenticated'
 */
router.post('/create', async (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) { next(new ERRORS.MissingBodyParametersError('name')); return };

  const project = await projectController.create(req.body.name, req.body.loggedUserId)
  if (project instanceof HTTPError) { next(project); return }

  return res.json(project)
});


/**
 *  @swagger
 *  components:
 *    examples:
 *      Project:
 *        value:
 *          id: 44be8dc2-ffc2-410e-893d-0aad4ed74bec
 *          name: Max Cakes SWOT from 2022
 *          authorId: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *          createdAt: 2022-10-24T01:12:20.799Z
 *      ListOfProjects:
 *        value:
 *          -
 *            id: 44be8dc2-ffc2-410e-893d-0aad4ed74bec
 *            name: Max Cakes SWOT from 2022
 *            authorId: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *            createdAt: 2022-10-24T01:12:20.799Z
 *          -
 *            id: 5092375a-01e0-4e98-a282-55cedf487e12
 *            name: Max Cakes SWOT to analyse Christmas sales strategy
 *            authorId: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *            createdAt: 2022-10-24T01:14:08.966Z
 *      CreateNewProject:
 *        value:
 *          name: Max Cakes SWOT from 2022
 *      NewProjectCreated:
 *        value:
 *          id: 44be8dc2-ffc2-410e-893d-0aad4ed74bec
 *          name: Max Cakes SWOT from 2022
 *          authorId: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *          createdAt: 2022-10-24T01:12:20.799Z
 */

export default router;