import { Resolver, Query } from 'type-graphql'
import { Website } from '..'

@Resolver(Website)
export class WebsiteResolver {

  @Query(returns => String)
  website(): string {
    return 'hello website'
  }
}
