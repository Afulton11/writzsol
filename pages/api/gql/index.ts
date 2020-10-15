import path from 'path';

import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, asNexusMethod } from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';
import { ApolloServer } from 'apollo-server-micro';
export const GQLDate = asNexusMethod(GraphQLDate, 'date');
export const schema = makeSchema({
  types: [GQLDate],
  plugins: [
    nexusSchemaPrisma({
      outputs: {
        // https://github.com/graphql-nexus/nexus-plugin-prisma/issues/531
        typegen: path.join(
          process.cwd(),
          'pages',
          'api',
          'gql',
          'typegen-nexus-plugin-prisma.d.ts'
        )
      }
    })
  ],
  outputs: {
    typegen: path.join(
      process.cwd(),
      'pages',
      'api',
      'gql',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'pages', 'api', 'gql', 'schema.graphql')
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
