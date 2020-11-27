import { ApolloError } from 'apollo-server-micro'

export class UserWebsiteError extends ApolloError {
  constructor(message, data?: any) {
    super(message, 'USER_WEBSITE', data ? { data: data } : undefined)
  }
}
