import { ObjectType, Field, ID } from 'type-graphql'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { EditableEntity } from '../common'

/**
 * CHECK NEXT-AUTH SCHEMA: https://next-auth.js.org/schemas/postgres
 */

@Entity()
@ObjectType({ implements: EditableEntity })
export class VerificationRequest extends EditableEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column('varchar', { length: 255 })
  @Field((type) => String)
  identifier: string

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  @Field((type) => String)
  token: string

  @Column('timestamp with time zone')
  @Field((type) => Date)
  expires: Date
}
