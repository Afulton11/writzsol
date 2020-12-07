import { AppOptions } from 'next-auth'
import { Profile, Adapter, AdapterInstance } from 'next-auth/adapters'
import { User, VerificationRequest, WritzsolSession } from '../models'
import { WritzsolTypeORMAdapterInstance } from './writzsol-adapter-instance'

export class WritzsolTypeORMAdapter
  implements Adapter<User, Profile, WritzsolSession, VerificationRequest> {
  async getAdapter(
    appOptions: AppOptions
  ): Promise<
    AdapterInstance<User, Profile, WritzsolSession, VerificationRequest>
  > {
    return new WritzsolTypeORMAdapterInstance(appOptions)
  }
}
