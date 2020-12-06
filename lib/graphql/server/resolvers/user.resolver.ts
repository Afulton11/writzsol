import { Resolver, Query } from 'type-graphql'
import { User } from '..'

@Resolver(User)
export class UserResolver {

  @Query(returns => String)
  user() {
    return 'hello'
  }
}
