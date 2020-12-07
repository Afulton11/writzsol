import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './user'
import { WebsiteStatus } from './website-status'
import { EditableEntity } from './common'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType({ implements: EditableEntity })
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

  @OneToMany((type) => User, (user) => user.websites)
  user: User
}