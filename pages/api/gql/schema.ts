import path from 'path'

import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema, fieldAuthorizePlugin, asNexusMethod } from '@nexus/schema'
import { GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLScalarType } from 'graphql'

import * as allMutations from '../../../lib/graphql/server/mutations'
import * as allQueries from '../../../lib/graphql/server/queries'
import * as allModels from '../../../lib/graphql/server/models'

import { Context } from './services/context'

export const JsonScalar = asNexusMethod(
  new GraphQLScalarType({
    ...GraphQLJSON,
    name: 'Json',
  }),
  'json'
)

export const DateTimeScalar = asNexusMethod(GraphQLDateTime, 'dateTime')

export const schema = makeSchema({
  types: {
    DateTimeScalar,
    JsonScalar,
    ...allModels,
    ...allQueries,
    ...allMutations,
  },
  plugins: [
    fieldAuthorizePlugin(),
    nexusSchemaPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime: DateTimeScalar,
        Json: JsonScalar,
      },
      prismaClient: (ctx: Context) => ctx.db,
      outputs: {
        // https://github.com/graphql-nexus/nexus-plugin-prisma/issues/531
        typegen: path.join(
          process.cwd(),
          'pages',
          'api',
          'gql',
          'typegen-nexus-plugin-prisma.d.ts'
        ),
      },
      computedInputs: {
        user: ({ ctx }) => {
          return {
            connect: {
              id: ctx.session.user.id,
            },
          }
        },
        userId: ({ ctx }) => {
          return {
            equals: ctx.session.user.id,
          }
        },
      },
    }),
  ],
  typegenAutoConfig: {
    headers: [
      'import * as ContextModule from "./services/context"'
    ],
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
    ],
    contextType: 'ContextModule.Context',
  },
  outputs: {
    typegen: path.join(
      process.cwd(),
      'pages',
      'api',
      'gql',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'pages', 'api', 'gql', 'schema.graphql'),
  },
})
