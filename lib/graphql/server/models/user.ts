import { ObjectType, Field, ID } from 'type-graphql'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './role'
import { Website } from './website'
import { EditableEntity } from './common'

@Entity()
@ObjectType({ implements: EditableEntity })
export class User extends EditableEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  @Field((type) => String, {
    nullable: true,
  })
  name: string

  @Index({ unique: true })
  @Column('varchar', {
    length: 320,
    nullable: true,
  })
  @Field((type) => String, {
    nullable: true,
  })
  email: string

  @Column('timestamp with time zone', {
    nullable: true,
  })
  @Field((type) => Date, {
    nullable: true,
  })
  emailVerified: Date

  @Column('text', {
    nullable: true,
  })
  @Field((type) => String, {
    nullable: true,
  })
  image: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  @Field((type) => Role, { defaultValue: Role.USER })
  role: Role

  @ManyToOne((type) => Website, (website) => website.user)
  @Field((type) => [Website])
  websites: Website[]
}
