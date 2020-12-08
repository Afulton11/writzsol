import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './user'
import { WebsiteStatus } from './website-status'
import { EditableEntity } from './common'
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Page } from './page'

@Entity()
@ObjectType({ implements: EditableEntity })
@Unique(['title', 'userId'])
export class Website extends EditableEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column('varchar', {
    length: 60,
  })
  @Field((type) => String, { description: 'title for the website' })
  title: string

  @Column('varchar', {
    length: 120,
    unique: true,
  })
  @Field((type) => String, {
    description: 'the website\'s baseUrl, e.g. "/andrew"',
  })
  location: string

  @Column({
    type: 'enum',
    enum: WebsiteStatus,
    default: WebsiteStatus.PRIVATE,
  })
  @Field((type) => WebsiteStatus, {
    description: "the website's published status.",
  })
  status: WebsiteStatus

  @Column('varchar', {
    length: 32,
  })
  @Field((type) => String, {
    description: 'the default theme for the website. e.g. "light"',
  })
  defaultTheme: string

  @Column('uuid')
  @Field((type) => ID)
  userId: string

  @OneToMany((type) => User, (user) => user.websites)
  @Field((type) => User, { nullable: true })
  user: User

  @OneToMany((type) => Page, (page) => page.website, { nullable: true })
  @Field((type) => [Page], { nullable: true, defaultValue: [] })
  @JoinTable()
  pages: Promise<Page[]>
}
