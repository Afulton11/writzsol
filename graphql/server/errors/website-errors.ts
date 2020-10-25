import { ApolloError } from 'apollo-server-micro';

export class UserWebsiteError extends ApolloError {
  constructor(message) {
    super(message, 'USER_WEBSITE');
  }
}
