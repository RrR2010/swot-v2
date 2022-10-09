import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { prisma } from '../server'
import { BaseError, ErrorType, InvalidPasswordError, LoginError, MissingBodyParametersError, ObjectAlreadyExistsError, ObjectNotFoundError } from '../types/errors'

const authConfig = require('../config/auth')

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { next(new MissingBodyParametersError(['name', 'email', 'password'])); return }

  const user = await prisma.user.findFirst({
    where: { email }
  })

  if (user) { next(new ObjectAlreadyExistsError('email')); return }

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
    next(new BaseError(400, ErrorType.GeneralError, "Error creating user.", "No details available", ""));
    return
  }
})

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({
    where: { email },
    // select: { id: true, email: true, password: true }
  })

  if (!user) { next(new ObjectNotFoundError('email')); return }

  if (!await bcrypt.compare(password, user.password)) { next(new InvalidPasswordError()); return }

  const token = jwt.sign(
    { id: user.id },
    authConfig.secret,
    { expiresIn: authConfig.expiresIn },
    (err, token) => {
      if (err) { next(new LoginError); return }
      return res.status(200).json({ user: user, token: token })
    }
  )
})

export default router