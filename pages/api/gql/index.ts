import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';

import { schema } from './schema';
import { Context } from './services/context';
import { Auth } from './services/auth';
import { NextApiRequest } from 'next';

const db = new PrismaClient();

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const auth = new Auth(req, db);
  const session = await auth.getSession();

  return {
    req,
    db,
    auth,
    session
  };
};

export const config = {
  api: {
    bodyParser: false
  }
};
export default new ApolloServer({
  schema,
  context,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  }
}).createHandler({
  path: '/api/gql'
});
