import { registerEnumType } from 'type-graphql'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The types of authorization roles for users',
})
