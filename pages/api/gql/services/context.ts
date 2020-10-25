import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { Auth } from './auth';

export class Context {
  db: PrismaClient;
  req: NextApiRequest;
  auth: Auth;
  data?: any;
}
