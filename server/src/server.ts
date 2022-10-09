import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'

import projects from './routes/project'
import sign from './routes/sign'
import auth from './routes/auth'

import { BaseError } from './types/errors'

const app = express()
export const prisma = new PrismaClient()

app.use(express.json())

app.use('/', sign)
app.all('/*', auth)
app.use('/projects', projects)


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

app.use((err: BaseError, req: express.Request, res: express.Response, next: any) => {
  return res.status(err.code).json({
    'type': err.type.toString(),
    'message': err.message,
    'details': err.detail,
    'helpUrl': err.helpUrl
  })
});

app.listen(3333)