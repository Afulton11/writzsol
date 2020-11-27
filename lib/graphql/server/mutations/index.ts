export * from './website'
import { mutationType } from '@nexus/schema'

export const mutations = mutationType({
  definition(t) {
    t.crud.updateOnePage({
      alias: 'updatePage',
    })
    t.crud.createOnePage({
      alias: 'createPage',
    })
    t.crud.deleteOnePage({
      alias: 'deletePage',
    })

    t.crud.updateOneUser({
      alias: 'updateUser',
    })
  },
})
