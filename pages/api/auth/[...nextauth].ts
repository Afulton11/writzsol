import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient, User } from '@prisma/client';
import { Session } from 'next-auth/client';

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session: Session, user: User) => {
      session.user = user;
      return session;
    }
  }
};

export default (req, res) => {
  return NextAuth(req, res, options);
};
