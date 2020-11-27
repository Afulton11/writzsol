import { queryType } from '@nexus/schema'

export const queries = queryType({
  definition(t) {
    t.crud.website()
    t.crud.websites({
      filtering: true,
      ordering: true,
      pagination: true,
      authorize: async (_root, _args, { auth }) => auth.guardIsLoggedIn(),
    })

    t.crud.page()
    t.crud.pages({
      authorize: async (_root, _args, { auth }) => auth.guardIsLoggedIn(),
    })
  },
})
