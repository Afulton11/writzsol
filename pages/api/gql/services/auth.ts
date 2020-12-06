import { AuthenticationError } from 'apollo-server-micro'
import { NextApiRequest } from 'next'
import {
  getSession as nextAuthGetSession,
  Session as NextAuthSession,
} from 'next-auth/client'

import { PrismaClient, User } from '@prisma/client'

export type WritzsolSession = NextAuthSession & {
  user: User
}

export class Auth {
  private session: WritzsolSession

  constructor(protected req: NextApiRequest) {}

  public async getSession() {
    if (!this.session) {
      this.session = <WritzsolSession>await nextAuthGetSession({
        req: this.req,
      })
    }

    return this.session
  }

  public getUser() {
    if (!this.session) {
      this.getSession()

      return this.session?.user
    }

    return this.session?.user
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.getSession()) != null
  }

  public async guardIsLoggedIn() {
    if (!(await this.isLoggedIn())) {
      throw new AuthenticationError('must be logged in!')
    }

    return true
  }
}
