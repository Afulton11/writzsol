import { ObjectType, Field, ID } from 'type-graphql'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EditableEntity } from '../common'
import { User } from '../user'

/**
 * CHECK NEXT-AUTH SCHEMA: https://next-auth.js.org/schemas/postgres
 */

@Entity()
@ObjectType({ implements: EditableEntity })
export class ProviderAccount extends EditableEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Index({ unique: true })
  @Column('varchar', {
    length: 255,
  })
  @Field((type) => ID)
  compoundId: string

  @Index()
  @Column('varchar', {
    length: 255,
  })
  @Field((type) => ID)
  providerId: string

  @Index()
  @Column('varchar', {
    length: 255,
  })
  @Field((type) => ID)
  providerAccountId: string

  @Column('varchar', {
    length: 255,
  })
  @Field((type) => String)
  providerType: string

  @Column('text', {
    nullable: true,
  })
  @Field((type) => String, {
    nullable: true,
  })
  refreshToken: string

  @Column('text', {
    nullable: true,
  })
  @Field((type) => String, {
    nullable: true,
  })
  accessToken: string

  @Column('timestamp with time zone', {
    nullable: true,
  })
  @Field((type) => Date)
  accessTokenExpires: Date

  @Index()
  @Column('uuid')
  @Field((type) => ID)
  userId: string

  @OneToOne((type) => User)
  @Field((type) => User)
  @JoinColumn()
  user: User
}
