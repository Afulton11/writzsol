import { objectType } from '@nexus/schema'

export const website = objectType({
  name: 'Website',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.title()
    t.model.pages()
    t.model.location()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.status()
    t.model.defaultTheme()
  },
})
