import path from 'path';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, asNexusMethod, fieldAuthorizePlugin } from '@nexus/schema';
import { GraphQLDateTime } from 'graphql-iso-date';
import * as allModels from '../../../graphql/server/models';
import * as allQueries from '../../../graphql/server/queries';
import * as allMutations from '../../../graphql/server/mutations';

export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime');

export const schema = makeSchema({
  types: { GQLDateTime, ...allModels, ...allQueries, ...allMutations },
  plugins: [
    fieldAuthorizePlugin(),
    nexusSchemaPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime: GraphQLDateTime
      },
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
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./services/context'),
        alias: 'ContextModule'
      }
    ],
    contextType: 'ContextModule.Context'
  },
  outputs: {
    typegen: path.join(
      process.cwd(),
      'pages',
      'api',
      'gql',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'pages', 'api', 'gql', 'schema.graphql')
  },
  prettierConfig: path.join(process.cwd(), '.prettierrc')
});
