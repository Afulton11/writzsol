import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Authorized,
  ArgsType,
  Args,
  Field,
  Mutation,
  InputType,
} from 'type-graphql'
import { getRepository } from 'typeorm'
import { Website, WebsiteStatus } from '../models'
import { Context } from '../../../../pages/api/gql/services'
import { OrderByInput, OrderDirection } from './common'
import '../../../../initializers/database'
import { IsOptional, MaxLength } from 'class-validator'
import { UserInputError } from 'apollo-server-micro'

@ArgsType()
export class CreateWebsiteArgs implements Partial<Website> {
  @MaxLength(60)
  @Field((type) => String)
  title: string

  @MaxLength(120)
  @Field((type) => String)
  location: string

  @Field((type) => WebsiteStatus, {
    nullable: true,
    defaultValue: WebsiteStatus.PRIVATE,
  })
  status?: WebsiteStatus

  @Field((type) => String, { nullable: true, defaultValue: 'light' })
  defaultTheme?: string
}

@InputType()
export class SaveWebsiteInput implements Partial<Website> {
  @Field((type) => String)
  id: string

  @IsOptional()
  @MaxLength(60)
  @Field((type) => String)
  title: string

  @IsOptional()
  @MaxLength(120)
  @Field((type) => String)
  location: string

  @IsOptional()
  @Field((type) => WebsiteStatus, {
    nullable: true,
    defaultValue: WebsiteStatus.PRIVATE,
  })
  status?: WebsiteStatus

  @IsOptional()
  @Field((type) => String, { nullable: true, defaultValue: 'light' })
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

  @Authorized()
  @Query((returns) => Website)
  async saveWebsite(
    @Arg('website') website: SaveWebsiteInput,
    @Ctx() { session }: Context
  ): Promise<Website> {
    const websiteRepository = getRepository<Website>(Website.name)

    const oldWebsite = websiteRepository.findOne({
      where: {
        id: website.id,
        userId: session.user.id,
      },
    })

    if (!oldWebsite) throw new UserInputError('The website was not found')

    return websiteRepository.save(website)
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
  @Query((returns) => Website, { nullable: true })
  async getWebsiteById(
    @Arg('id', (type) => String) websiteId: string,
    @Ctx() { session }: Context
  ): Promise<Website> {
    const websiteRepository = getRepository<Website>(Website.name)

    return websiteRepository.findOne({
      where: {
        id: websiteId,
        userId: session.user.id,
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
