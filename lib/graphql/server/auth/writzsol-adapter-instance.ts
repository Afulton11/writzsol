/**
 * Adapter inspired by:
 * https://github.com/nextauthjs/next-auth/blob/canary/src/adapters/typeorm/index.js
 */
import { createHash, randomBytes } from 'crypto'
import { AppOptions } from 'next-auth'
import {
  AdapterInstance,
  EmailSessionProvider,
  Profile,
} from 'next-auth/adapters'
import { SessionProvider } from 'next-auth/client'
import { getRepository, Repository } from 'typeorm'
import {
  ProviderAccount,
  User,
  VerificationRequest,
  WritzsolSession,
} from '../models'

const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000

export class WritzsolTypeORMAdapterInstance
  implements
    AdapterInstance<User, Profile, WritzsolSession, VerificationRequest> {
  private readonly sessionMaxAge: number
  private readonly sessionUpdateAge: number

  private readonly userRepository: Repository<User>
  private readonly accountRepository: Repository<ProviderAccount>
  private readonly sessionRepository: Repository<WritzsolSession>

  constructor(appOptions: AppOptions) {
    this.sessionMaxAge =
      appOptions && appOptions.session && appOptions.session.maxAge
        ? appOptions.session.maxAge * 1000
        : defaultSessionMaxAge
    this.sessionUpdateAge =
      appOptions && appOptions.session && appOptions.session.updateAge
        ? appOptions.session.updateAge * 1000
        : 0

    this.userRepository = getRepository(User.name)
    this.accountRepository = getRepository(ProviderAccount.name)
    this.sessionRepository = getRepository(WritzsolSession.name)

    this.getSession.bind(this)
  }

  createUser = async (profile: Profile) => {
    return this.userRepository.save({
      name: profile.name,
      email: profile.email,
      image: profile.image,
    })
  }

  getUser = async (id) => {
    return this.userRepository.findOne(id)
  }

  getUserByEmail = async (email) => {
    return this.userRepository.findOne({ where: { email } })
  }

  getUserByProviderAccountId = async (providerId, providerAccountId) => {
    const account = await this.accountRepository.findOne({
      where: {
        providerId,
        providerAccountId,
      },
      relations: ['user'],
    })

    return account?.user
  }

  updateUser = async (user) => {
    return this.userRepository.save(user)
  }

  deleteUser = async (userId) => {
    return this.userRepository.delete(userId)
  }

  linkAccount = async (
    userId: string,
    providerId: string,
    providerType: string,
    providerAccountId: string,
    refreshToken: string,
    accessToken: string,
    accessTokenExpires: number
  ): Promise<any> => {
    // ensure only one entry for a provider AND account.
    const compoundId = createHash('sha256')
      .update(`${providerId}:${providerAccountId}`)
      .digest('hex')
    const accountData = {
      userId,
      providerId,
      compoundId,
      providerType,
      providerAccountId,
      refreshToken,
      accessToken,
      accessTokenExpires,
    }

    try {
      const account = await this.accountRepository.save(accountData)

      return account
    } catch (error) {
      console.error('LINK_ACCOUNT_ERROR', error)
      return Promise.reject(new Error('LINK_ACCOUNT_ERROR'))
    }
  }

  createSession = async (user: User): Promise<any> => {
    let expiresAt = null
    if (this.sessionMaxAge) {
      const expirationDate = new Date()
      expirationDate.setTime(expirationDate.getTime() + this.sessionMaxAge)
      expiresAt = expirationDate
    }

    const session = this.sessionRepository.save({
      user: user,
      expires: expiresAt,
      sessionToken: randomBytes(32).toString('hex'),
      accessToken: randomBytes(32).toString('hex'),
    })

    return session
  }

  getSession = async (
    sessionToken: string
  ): Promise<WritzsolSession | null> => {
    const session = await this.sessionRepository.findOne({
      sessionToken,
    })

    if (session && session.expires && new Date() > new Date(session.expires)) {
      this.deleteSession(session.sessionToken)
      return null
    }

    return session
  }

  updateSession = async (
    session: WritzsolSession,
    force?: boolean
  ): Promise<WritzsolSession> => {
    if (
      this.sessionMaxAge &&
      (this.sessionUpdateAge || this.sessionUpdateAge === 0)
    ) {
      const shouldUpdateOn = new Date(session.expires)
      shouldUpdateOn.setTime(shouldUpdateOn.getTime() - this.sessionMaxAge)
      shouldUpdateOn.setTime(shouldUpdateOn.getTime() - this.sessionUpdateAge)

      const shouldSessionUpdate = new Date() > shouldUpdateOn
      if (shouldSessionUpdate) {
        const newExpirationDate = new Date()
        newExpirationDate.setTime(
          newExpirationDate.getTime() + this.sessionMaxAge
        )
        session.expires = newExpirationDate
      } else if (!force) return null
    } else {
      if (!force) return null
    }

    return this.sessionRepository.save(session)
  }

  deleteSession = async (sessionToken: string): Promise<any> => {
    return await this.sessionRepository.delete({
      sessionToken,
    })
  }

  createVerificationRequest = async (
    email: string,
    url: string,
    token: string,
    secret: string,
    provider: EmailSessionProvider,
    options: AppOptions
  ): Promise<VerificationRequest> => {
    throw new Error('Not implemented.')
  }

  getVerificationRequest = async (
    email: string,
    verificationToken: string,
    secret: string,
    provider: SessionProvider
  ): Promise<VerificationRequest | null> => {
    throw new Error('Not implemented.')
  }

  deleteVerificationRequest = async (
    email: string,
    verificationToken: string,
    secret: string,
    provider: SessionProvider
  ): Promise<void> => {
    throw new Error('Not implemented.')
  }
}
