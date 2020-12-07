import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export const writzsolAuthChecker: AuthChecker<Context> = (
  { context },
  roles
) => {
  const { session } = context

  if (!session) return false
  if (roles.length === 0) return true
  return roles.includes(session.user.role)
}
