import { AuthenticationError, ApolloError } from 'apollo-server-micro'
import { IsBoolean, IsObject, IsOptional, IsUrl } from 'class-validator'
import GraphQLJSON from 'graphql-type-json'
import { userInfo } from 'os'
import {
  Resolver,
  Query,
  Arg,
  InputType,
  Mutation,
  Field,
  Authorized,
  Ctx,
} from 'type-graphql'
import { getRepository } from 'typeorm'
import { Context } from '../../../../pages/api/gql/services'
import { Page, User, Website } from '../models'

@InputType()
class CreatePageInput implements Partial<Page> {
  @Field((type) => String)
  websiteId: string

  @Field((type) => String)
  path: string

  @IsOptional()
  @Field((type) => GraphQLJSON, { nullable: true })
  blocks?: object

  @IsOptional()
  @IsBoolean()
  @Field((type) => Boolean, { nullable: true, defaultValue: false })
  isPublished?: boolean
}

@InputType()
class SavePageInput implements Partial<Page> {
  @IsUrl()
  @IsOptional()
  @Field((type) => String)
  path?: string

  @IsObject()
  @IsOptional()
  @Field((type) => GraphQLJSON)
  blocks?: object

  @IsBoolean()
  @IsOptional()
  @Field((type) => Boolean)
  isPublished?: boolean
}

@Resolver(Page)
export class PageResolver {
  @Query((returns) => Page)
  async getPage(
    @Arg('path', (type) => String) path: string,
    @Arg('location', (type) => String) location: string
  ): Promise<Page> {
    const pageRepository = getRepository<Page>(Page.name)

    return pageRepository.findOne({
      where: {
        path,
        website: {
          location,
        },
      },
      relations: [Website.name],
    })
  }

  @Authorized()
  @Query((returns) => [Page])
  async getPages(
    @Arg('location', (type) => String) location: string,
    @Ctx() { session }: Context
  ): Promise<Page[]> {
    const { user } = session
    const websiteRepository = getRepository<Website>(Website.name)

    const website = await websiteRepository.findOne({
      where: {
        location,
        userId: user.id,
      },
    })

    return website?.pages ?? []
  }

  @Authorized()
  @Mutation((returns) => Page)
  async createPage(
    @Arg('page', (type) => CreatePageInput) page: CreatePageInput,
    @Ctx() { session }: Context
  ): Promise<Page> {
    const pageRepository = getRepository<Page>(Page.name)
    const websiteRepository = getRepository<Website>(Website.name)
    const userId = session.user.id

    const website = await websiteRepository.findOne({
      where: {
        id: page.websiteId,
        userId,
      },
    })

    if (!website)
      throw new ApolloError('Website does not exist!', 'CREATE_PAGE', {
        page,
      })

    const savedPage = await pageRepository.save({
      ...page,
      userId,
    })

    return savedPage
  }

  @Authorized()
  @Mutation((returns) => Page)
  async savePage(
    @Arg('page', (type) => SavePageInput) pageToSave: SavePageInput,
    @Ctx() { session }: Context
  ): Promise<Page> {
    const pageRepository = getRepository<Page>(Page.name)
    const page = await pageRepository.findOne(pageToSave)

    if (!page)
      throw new ApolloError('Requested page does not exist!', 'SAVE_PAGE', {
        pageToSave,
      })

    if (!this.doesUserOwnPage(session.user, page))
      throw new AuthenticationError('User does not own page!')

    return pageRepository.save(pageToSave)
  }

  @Authorized()
  @Mutation((returns) => Page, { nullable: true })
  async deletePage(
    @Arg('path', (type) => String) path: string,
    @Arg('location', (type) => String) location: string,
    @Ctx() { session }: Context
  ) {
    const pageRepository = getRepository<Page>(Page.name)
    const page = await this.getPage(path, location)

    if (!page) return {}
    if (!this.doesUserOwnPage(session.user, page))
      throw new AuthenticationError('User does not own page!')

    return pageRepository.save(page)
  }

  doesUserOwnPage = (user: User, page: Page) => page.userId === user.id
}
