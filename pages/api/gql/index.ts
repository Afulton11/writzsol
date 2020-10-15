import path from 'path';

import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, asNexusMethod } from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';
import { ApolloServer } from 'apollo-server-micro';
export const GQLDate = asNexusMethod(GraphQLDate, 'date');
export const schema = makeSchema({
  types: [GQLDate],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    typegen: path.join(
      process.cwd(),
      'graphql',
      'generated',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'graphql', 'generated', 'schema.graphql')
  }
});
export const config = {
  api: {
    bodyParser: false
  }
};
export default new ApolloServer({ schema }).createHandler({
  path: '/api/gql'
});
