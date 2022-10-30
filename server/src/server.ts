// modules
import express from 'express'
import { PrismaClient } from '@prisma/client'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// routes
import auth from '../src/api/v1/routes/auth'
import sign from '../src/api/v1/routes/sign'
import projects from '../src/api/v1/routes/project'

// JSON objects
import swaggerOptions from './config/swagger/options.json'
import { HTTPError } from './api/v1/interfaces/errors'

// utils functions
import { prepareErrorDocs } from './api/v1/helpers/error-docs-generator'

const app = express()
export const prisma = new PrismaClient()

prepareErrorDocs()

app.use(express.json())

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)))

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

app.use((err: HTTPError, req: express.Request, res: express.Response, next: any) => {
  const errorClass = <typeof HTTPError>err.constructor
  return res.status(errorClass.code).json({
    'code': errorClass.code,
    'type': errorClass.type.toString(),
    'message': err.message
  })
});

app.listen(3333)