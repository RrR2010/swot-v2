import { PrismaClient } from '@prisma/client'

async function excludePasswordMiddleware(params: any, next: any) {
    const result = await next(params)
    console.log(params?.model)
    if (params?.model === 'User' && params?.args?.select?.password !== true) {
        delete result.password
    }
    return result
}

const prisma = new PrismaClient()
prisma.$use(excludePasswordMiddleware)