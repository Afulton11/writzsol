import { NextApiRequest } from 'next';

import { PrismaClient } from '@prisma/client';

import { Auth } from './auth';
import { Session } from 'next-auth/client';

export class Context {
  db: PrismaClient;

  req: NextApiRequest;

  auth: Auth;

  data?: any;

  session: Session;
}
