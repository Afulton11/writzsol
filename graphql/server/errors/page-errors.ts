import { ApolloError } from 'apollo-server-micro';

export class PageError extends ApolloError {
  constructor(message) {
    super(message, 'PAGE_ERROR');
  }
}
