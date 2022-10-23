// modules
import express from 'express'
import { PrismaClient } from '@prisma/client'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// routes
import auth from './routes/auth/auth'
import sign from './routes/sign/sign'
import projects from './routes/projects/project'

// JSON objects
import swaggerOptions from './config/swagger-options.json';
import { HTTPError } from './types/errors'

// utils functions
import { prepareErrorDocs } from './utils/error-docs-generator'

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