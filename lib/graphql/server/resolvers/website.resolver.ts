import { Resolver, Query, Arg, Ctx, Authorized, ArgsType, Args, Field, Mutation } from 'type-graphql'
import { getRepository } from 'typeorm'
import { Website, WebsiteStatus } from '../models'
import { Context } from '../../../../pages/api/gql/services'
import { OrderByInput, OrderDirection } from './common'
import '../../../../initializers/database'
import { MaxLength } from 'class-validator'

@ArgsType()
export class CreateWebsiteArgs implements Partial<Website> {
  @MaxLength(60)
  @Field(type => String)
  title: string
  
  @MaxLength(120)
  @Field(type => String)
  location: string

  @Field(type => WebsiteStatus, { nullable: true, defaultValue: WebsiteStatus.PRIVATE })
  status?: WebsiteStatus

  @Field(type => String, { nullable: true, defaultValue: 'light' })
  defaultTheme?: string
}

@Resolver(Website)
export class WebsiteResolver {
  @Authorized()
  @Mutation((returns) => Website)
  async createWebsite(
    @Args((type) => CreateWebsiteArgs) website: CreateWebsiteArgs,
    @Ctx() { session }: Context
  ): Promise<Website> {
    if (!website.status) website.status = WebsiteStatus.PRIVATE
    if (!website.defaultTheme) website.defaultTheme = 'light'

    const websiteRepository = getRepository<Website>('website')

    return websiteRepository.save({
      ...website,
      userId: session.user.id,
    })
  }

  @Query((returns) => Website, { nullable: true })
  async getWebsiteByLocation(
    @Arg('location', (type) => String) location: string
  ): Promise<Website> {
    const websiteRepository = getRepository<Website>('website')

    return websiteRepository.findOne({
      where: {
        status: WebsiteStatus.PUBLISHED,
        location,
      },
    })
  }

  @Authorized()
  @Query((returns) => [Website])
  async websites(
    @Arg('orderBy', (type) => OrderByInput, {
      nullable: true,
      defaultValue: { updatedAt: OrderDirection.DESC },
    })
    orderBy: OrderByInput,
    @Ctx() { session }: Context
  ): Promise<Website[]> {
    const websiteRepository = getRepository<Website>('website')
    const userId = session.user.id

    return websiteRepository.find({
      where: {
        userId,
      },
      order: {
        ...orderBy,
      },
    })
  }
}
