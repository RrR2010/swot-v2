import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.get('/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: {createdAt: 'desc'}
  })
  return res.json(projects)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: {name: 'asc'}
  })
  return res.json(users)
})

app.listen(3333)