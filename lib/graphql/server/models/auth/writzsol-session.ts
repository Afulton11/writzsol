import { ObjectType, Field, ID } from 'type-graphql'
import { Session as NextAuthSession } from 'next-auth/adapters'
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
export class WritzsolSession extends EditableEntity implements NextAuthSession {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column('timestamp with time zone')
  @Field((type) => Date)
  expires: Date

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  @Field((type) => String)
  sessionToken: string

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  @Field((type) => String)
  accessToken: string

  @Column('uuid')
  @Field((type) => ID)
  userId: string

  @OneToOne((type) => User)
  @Field((type) => User)
  @JoinColumn()
  user: User
}
