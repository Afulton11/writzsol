import { enumType } from '@nexus/schema'

export const websiteStatus = enumType({
  name: 'WebsiteStatus',
  members: ['PRIVATE', 'PUBLISHED'],
  description: 'The website status.',
})
