import { enumType } from '@nexus/schema';

export const role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN', 'DEVELOPER'],
  description: 'The types of user authorization roles'
});
