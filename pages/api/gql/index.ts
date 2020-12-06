import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { NextApiRequest } from 'next'
import { Context, Auth } from './services'
import * as resolversObject from '../../../lib/graphql/server/resolvers'
import * as entitiesObject from '../../../lib/graphql/server/models'
import {
  createConnection,
  getConnectionManager,
  getConnectionOptions,
} from 'typeorm'

if (!getConnectionManager().has('default')) {
  const connectionOptions = await getConnectionOptions()

  //@ts-ignore
  await createConnection({
    ...connectionOptions,
    entities: Object.values(entitiesObject),
  })
}

const schema = await buildSchema({
  //@ts-ignore
  resolvers: Object.values(resolversObject),
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
