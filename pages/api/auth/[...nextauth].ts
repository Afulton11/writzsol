import 'reflect-metadata'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { Session } from 'next-auth/client'
import { User } from '../../../lib/graphql/server'
import { WritzsolTypeORMAdapter } from '../../../lib/graphql/server/auth/'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: new WritzsolTypeORMAdapter(),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session: Session, user: User) => {
      session.user = user
      return session
    },
  },
}

export default function AuthenticationHandler(req, res) { 
  return NextAuth(req, res, options)
}