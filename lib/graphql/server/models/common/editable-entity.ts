import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { InterfaceType, Field } from 'type-graphql'

@InterfaceType()
export abstract class EditableEntity {
  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt?: Date | null
}
