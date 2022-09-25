import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const authConfig = require('../src/config/auth')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.post('/signup', async (req, res) => {
  console.log('A')
  const { name, email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email }
  })

  if (user) {
    return res.status(401).json({ error: 'Email already exists' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return res.status(200).json({ newUser })
  } catch {
    return res.status(401).json({ error: 'Error creating user' })
  }


})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({
    where: { email },
    // select: { id: true, email: true, password: true }
  })

  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  const token = jwt.sign(
    { id: user.id },
    authConfig.secret,
    { expiresIn: authConfig.expiresIn }
  )

  return res.status(200).json({ user: user, token: token })

})


app.get('/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return res.json(projects)
})

app.get('/projects/:id', async (req, res) => {
  const project = await prisma.project.findFirstOrThrow({
    where: { id: req.params.id }
  })
  return res.json(project)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { name: 'asc' }
  })
  return res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const users = await prisma.user.findFirstOrThrow({
    where: { id: req.params.id }
  })
  return res.json(users)
})

app.get('/users/:id/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { authorId: req.params.id },
    orderBy: { createdAt: 'desc' },
  })
  return res.json(projects)
})

app.put('/users/:id/projects', async (req, res) => {
  const body = req.body;
  const project = await prisma.project.create({
    data: {
      name: body.name,
      authorId: req.params.id,
    }
  })
  return res.status(201).json(project)
})

app.get('/factortypes', async (req, res) => {
  const factorTypes = await prisma.factorType.findMany()
  return res.json(factorTypes)
})

app.get('/factors', async (req, res) => {
  const factors = await prisma.factor.findMany()
  return res.json(factors)
})

app.listen(3333)