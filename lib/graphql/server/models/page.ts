import { ObjectType, Field, ID } from 'type-graphql'
import { Website } from '../models'
import { EditableEntity } from './common'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import GraphQLJSON from 'graphql-type-json'
import { MaxLength } from 'class-validator'

@Entity()
@ObjectType({ implements: EditableEntity })
export class Page extends EditableEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column('uuid')
  @Field((type) => String, {
    description: 'website id this page is related to',
  })
  websiteId: string

  @MaxLength(120)
  @Column('varchar', {
    length: 120,
  })
  @Field((type) => String, {
    description: 'the page\'s url, e.g. "/blog/day-one"',
  })
  path: string

  @Column('jsonb', { nullable: true })
  @Field((type) => GraphQLJSON, { nullable: true })
  blocks: object

  @Column('bool', { default: false })
  @Field((type) => Boolean, {
    description: 'Whether this page is published.',
    defaultValue: false,
  })
  isPublished: boolean

  @Column('uuid')
  @Field((type) => ID)
  userId: string

  @ManyToOne((type) => Website, (website) => website.pages)
  @Field((type) => Website)
  website: Website
}
