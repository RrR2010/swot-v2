import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: {createdAt: 'desc'}
  })
  return res.json(projects)
})

app.get('/projects/:id', async (req, res) => {
  const project = await prisma.project.findFirstOrThrow({
    where: {id: req.params.id}
  })
  return res.json(project)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: {name: 'asc'}
  })
  return res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const users = await prisma.user.findFirstOrThrow({
    where: {id: req.params.id}
  })
  return res.json(users)
})

app.get('/users/:id/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {authorId: req.params.id},
    orderBy: {createdAt: 'desc'},
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