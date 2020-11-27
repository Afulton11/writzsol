import { ApolloError } from 'apollo-server-micro'

export class PageError extends ApolloError {
  constructor(message, data?: any) {
    super(message, 'PAGE_ERROR', data ? { data: data } : undefined)
  }
}
