import { queryType } from '@nexus/schema'
import { FindManyWebsiteArgs } from '@prisma/client'

export const queries = queryType({
  definition(t) {
    t.crud.websites({
      type: 'Website',
      filtering: true,
      ordering: true,
      authorize: (_root, _args, { auth }) => auth.guardIsLoggedIn(),
      resolve: async (_root, args, { db, session }) => {
        return db.user
          .findOne({
            where: { id: session.user.id },
          })
          .websites(<FindManyWebsiteArgs>args)
      },
    })

    t.crud.page()
    t.crud.pages({
      authorize: async (_root, _args, { auth }) => auth.guardIsLoggedIn(),
    })
  },
})
