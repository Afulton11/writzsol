import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  Account: Prisma.Account
  Session: Prisma.Session
  User: Prisma.User
  VerificationRequest: Prisma.VerificationRequest
  Website: Prisma.Website
  Page: Prisma.Page
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'role' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt' | 'website'
      ordering: 'id' | 'role' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
    }
    verificationRequests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
    }
    websites: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'title' | 'location' | 'status' | 'pages' | 'defaultTheme' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'title' | 'location' | 'status' | 'defaultTheme' | 'createdAt' | 'updatedAt'
    }
    pages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'path' | 'website' | 'blocks' | 'createdAt' | 'updatedAt' | 'websiteId'
      ordering: 'id' | 'path' | 'blocks' | 'createdAt' | 'updatedAt' | 'websiteId'
    }
  },
  Account: {

  }
  Session: {

  }
  User: {

  }
  VerificationRequest: {

  }
  Website: {
    pages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'path' | 'website' | 'blocks' | 'createdAt' | 'updatedAt' | 'websiteId'
      ordering: 'id' | 'path' | 'blocks' | 'createdAt' | 'updatedAt' | 'websiteId'
    }
  }
  Page: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    account: 'Account'
    accounts: 'Account'
    session: 'Session'
    sessions: 'Session'
    user: 'User'
    users: 'User'
    verificationRequest: 'VerificationRequest'
    verificationRequests: 'VerificationRequest'
    website: 'Website'
    websites: 'Website'
    page: 'Page'
    pages: 'Page'
  },
  Mutation: {
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'BatchPayload'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'BatchPayload'
    upsertOneAccount: 'Account'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'BatchPayload'
    deleteOneSession: 'Session'
    deleteManySession: 'BatchPayload'
    upsertOneSession: 'Session'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneVerificationRequest: 'VerificationRequest'
    updateOneVerificationRequest: 'VerificationRequest'
    updateManyVerificationRequest: 'BatchPayload'
    deleteOneVerificationRequest: 'VerificationRequest'
    deleteManyVerificationRequest: 'BatchPayload'
    upsertOneVerificationRequest: 'VerificationRequest'
    createOneWebsite: 'Website'
    updateOneWebsite: 'Website'
    updateManyWebsite: 'BatchPayload'
    deleteOneWebsite: 'Website'
    deleteManyWebsite: 'BatchPayload'
    upsertOneWebsite: 'Website'
    createOnePage: 'Page'
    updateOnePage: 'Page'
    updateManyPage: 'BatchPayload'
    deleteOnePage: 'Page'
    deleteManyPage: 'BatchPayload'
    upsertOnePage: 'Page'
  },
  Account: {
    id: 'Int'
    compoundId: 'String'
    userId: 'Int'
    providerType: 'String'
    providerId: 'String'
    providerAccountId: 'String'
    refreshToken: 'String'
    accessToken: 'String'
    accessTokenExpires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Session: {
    id: 'Int'
    userId: 'Int'
    expires: 'DateTime'
    sessionToken: 'String'
    accessToken: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  User: {
    id: 'Int'
    role: 'Role'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    image: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    website: 'Website'
  }
  VerificationRequest: {
    id: 'Int'
    identifier: 'String'
    token: 'String'
    expires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Website: {
    id: 'Int'
    userId: 'Int'
    user: 'User'
    title: 'String'
    location: 'String'
    status: 'WebsiteStatus'
    pages: 'Page'
    defaultTheme: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Page: {
    id: 'Int'
    path: 'String'
    website: 'Website'
    blocks: 'Json'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    websiteId: 'Int'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Account: Typegen.NexusPrismaFields<'Account'>
  Session: Typegen.NexusPrismaFields<'Session'>
  User: Typegen.NexusPrismaFields<'User'>
  VerificationRequest: Typegen.NexusPrismaFields<'VerificationRequest'>
  Website: Typegen.NexusPrismaFields<'Website'>
  Page: Typegen.NexusPrismaFields<'Page'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  