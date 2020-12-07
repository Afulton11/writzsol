import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { User } from '../../lib/graphql/server'

type useUserType = [User, boolean]

export const useUser = (isRequired = true): useUserType => {
  const [session, isLoading] = useSession()
  const router = useRouter()

  const user = session?.user

  if (isRequired) {
    useEffect(() => {
      if (!isLoading && !session) {
        router.push('/api/auth/signin')
      }
    })
  }

  return [user as User, isLoading]
}
