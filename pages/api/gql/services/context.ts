import { NextApiRequest } from 'next'

import { Auth, WritzsolSession } from './auth'

export class Context {

  req: NextApiRequest

  auth: Auth

  data?: any

  session: WritzsolSession
}
