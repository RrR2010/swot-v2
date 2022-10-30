import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../server'
import { ERRORS } from '../interfaces/errors'

import authConfig from '../../../config/auth.json'

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: New user signup.
 *     description: Use this route to create a new user.
 *     tags:
 *       - Authentication and authorization
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             CreateNewUser:
 *               $ref: '#/components/examples/CreateNewUser'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               NewUserCreated:
 *                 $ref: '#/components/examples/NewUserCreated'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HTTPError'
 *             examples:
 *               MissingBodyParameters:
 *                 $ref: '#/components/errors/MissingBodyParameters'
 *               ObjectAlreadyExists:
 *                 $ref: '#/components/errors/ObjectAlreadyExists'
 *               GeneralError:
 *                 $ref: '#/components/errors/GeneralError'
 */
router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { next(new ERRORS.MissingBodyParametersError(['name', 'email', 'password'])); return }

  const user = await prisma.user.findFirst({
    where: { email }
  })

  if (user) { next(new ERRORS.ObjectAlreadyExistsError('email')); return }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return res.status(201).json({ newUser })
  } catch {
    next(new ERRORS.HTTPError("Error creating user."));
    return
  }
})

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User login
 *     description: Use this route to Login to an account.
 *     tags:
 *       - Authentication and authorization
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             LoginUser:
 *               $ref: '#/components/examples/LoginUser'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *             examples:
 *               NewUserCreated:
 *                 $ref: '#/components/examples/UserLogged'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HTTPError'
 *             examples:
 *               MissingBodyParameters:
 *                 $ref: '#/components/errors/MissingBodyParameters'
 *               InvalidBodyParameters:
 *                 $ref: '#/components/errors/InvalidBodyParameters'
 *               GeneralError:
 *                 $ref: '#/components/errors/GeneralError'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HTTPError'
 *             examples:
 *               ObjectNotFound:
 *                 $ref: '#/components/errors/ObjectNotFound'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HTTPError'
 *             examples:
 *               LoginFailed:
 *                 $ref: '#/components/errors/LoginFailed'
 */
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { next(new ERRORS.MissingBodyParametersError(['email', 'password'])); return }

  let user = await prisma.user.findFirst({
    where: { email },
    // select: { id: true, email: true, password: true }
  })

  if (!user) { next(new ERRORS.ObjectNotFoundError('email')); return }

  if (!await bcrypt.compare(password, user.password)) { next(new ERRORS.InvalidBodyParameters("password")); return }

  const token = jwt.sign(
    { id: user.id },
    authConfig.secret,
    { expiresIn: authConfig.expiresIn },
    (err, token) => {
      if (err) { next(new ERRORS.LoginError()); return }
      return res.status(200).json({ user: user, token: token })
    }
  )
})

/**
 * @swagger
 * components:
 *   examples:
 *     User:
 *       value:
 *         id: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *         name: Max Taylor
 *         email: maxtaylor123@email.com
 *         password: 2684expressMax
 *         createdAt: 2022-10-22T22:53:15.235Z
 *     CreateNewUser:
 *       value:
 *         name: Max Taylor
 *         email: maxtaylor123@email.com
 *         password: 2684expressMax
 *     NewUserCreated:
 *       value:
 *         name: Max Taylor
 *         email: maxtaylor123@email.com
 *         createdAt: 2022-10-22T22:53:15.235Z
 *     LoginUser:
 *       value:
 *         email: maxtaylor123@email.com
 *         password: 2684expressMax
 *     UserLogged:
 *       value:
 *         user:
 *           id: b2f7f4d9-b18a-4843-88bd-65e6331885af
 *           name: Max Taylor
 *           email: maxtaylor123@email.com
 *           password: 2684expressMax
 *           createdAt: 2022-10-22T22:53:15.235Z
 *         token: 2684expressMaxeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmZTAzMDRhLTAwYzEtNDg5Zi05OTNlLTE4MjVhMWUyNjg1MiIsImlhdCI6MTY2NjU3MTI4OSwiZXhwIjoxNjY2NzQ0MDg5fQ.JMcSPQ8AJvpX3P57VDPwjLuUqofeFWcGYLcYEjNbKjc
 */

export default router