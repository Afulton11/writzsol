import { NextApiRequest } from 'next'

import { PrismaClient } from '@prisma/client'

import { Auth, WritzsolSession } from './auth'

export class Context {
  db: PrismaClient

  req: NextApiRequest

  auth: Auth

  data?: any

  session: WritzsolSession
}
