import { objectType } from '@nexus/schema'

export const page = objectType({
  name: 'Page',
  definition(t) {
    t.model.id()
    t.model.path()
    t.model.blocks()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
