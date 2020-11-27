import { extendType } from '@nexus/schema'
import { Context } from 'nexus-plugin-prisma/typegen'
import {
  // Page,
  PageUpdateArgs,
  PageCreateArgs,
  PageDeleteArgs,
  PageWhereUniqueInput,
  // PageCreateInput
} from '@prisma/client'

import { PageError } from '../errors/page-errors'

import { authorizeUserOwnsWebsite } from './website'

export const pageMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePage({
      authorize: async (_, args: PageCreateArgs, ctx) => {
        const [website, user] = await authorizeUserOwnsWebsite({
          whereWebsite: args.data.website.connect,
          ctx,
        })

        return Boolean(website && user)
      },
    })
    t.crud.updateOnePage({
      authorize: async (_, args: PageUpdateArgs, ctx) => {
        const [page, website, user] = await authorizePageEdit({
          wherePage: args.where,
          ctx,
        })

        return Boolean(page && website && user)
      },
    })
    t.crud.deleteOnePage({
      authorize: async (_, args: PageDeleteArgs, ctx) => {
        const [page, website, user] = await authorizePageEdit({
          wherePage: args.where,
          ctx,
        })

        return Boolean(page && website && user)
      },
    })
  },
})

const authorizePageEdit = async ({
  wherePage,
  ctx,
}: {
  wherePage: PageWhereUniqueInput
  ctx: Context
}) => {
  const { auth, db } = ctx

  auth.guardIsLoggedIn()

  const page = await db.page.findOne({
    where: wherePage,
  })

  if (!page) {
    throw new PageError(`page does not exist!`, wherePage)
  }

  const [website, user] = await authorizeUserOwnsWebsite({
    whereWebsite: {
      id: page.websiteId,
    },
    ctx,
  })

  return [page, website, user]
}
