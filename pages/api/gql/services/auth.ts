import { PrismaClient, User } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-micro';
import { NextApiRequest } from 'next';
import { getSession as nextAuthGetSession, Session } from 'next-auth/client';

export class Auth {
  private session: Session;
  private user: User;

  constructor(protected req: NextApiRequest, protected db: PrismaClient) {}

  public async getSession() {
    if (!this.session) {
      return (this.session = await nextAuthGetSession({
        req: this.req
      }));
    }

    return this.session;
  }

  public async getUser() {
    if (!this.user) {
      const session = await this.getSession();
      const { email } = session?.user;

      return (this.user = await this.db.user.findOne({
        where: {
          email
        }
      }));
    }

    return this.user;
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.getSession()) != null;
  }

  public async guardIsLoggedIn() {
    if (await this.isLoggedIn()) {
      throw new AuthenticationError('must be logged in!');
    }
  }
}
