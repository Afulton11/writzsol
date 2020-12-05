import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { NextApiRequest } from 'next'
import { Context, Auth } from './services'

const schema = await buildSchema({
  resolvers: [
    __dirname + '../../../lib/graphql/server/resolvers/*-resolver.ts',
  ],
})

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const auth = new Auth(req)
  const session = await auth.getSession()

  return {
    req,
    auth,
    session,
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({
  schema,
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
}).createHandler({
  path: '/api/gql',
})
