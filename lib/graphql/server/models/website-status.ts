import { registerEnumType } from 'type-graphql'

export enum WebsiteStatus {
  PRIVATE = 'PRIVATE',
  PUBLISHED = 'PUBLISHED',
}

registerEnumType(WebsiteStatus, {
  name: 'WebsiteStatus',
  description: 'The published status for a website.',
})
