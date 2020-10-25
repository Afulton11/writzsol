import { ApolloServer } from 'apollo-server-micro';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';
import { Context } from './services/context';
import { Auth } from './services/auth';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};
export default new ApolloServer({
  schema,
  context: ({ req }): Context => ({
    req,
    db: prisma,
    auth: new Auth(req, prisma)
  }),
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  }
}).createHandler({
  path: '/api/gql'
});
