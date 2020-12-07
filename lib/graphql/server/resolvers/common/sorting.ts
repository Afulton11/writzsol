import { Field, InputType, registerEnumType } from 'type-graphql'

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
})

@InputType()
export class OrderByInput {
  @Field((type) => OrderDirection, { nullable: true })
  updatedAt: OrderDirection

  @Field((type) => OrderDirection, { nullable: true })
  createdAt: OrderDirection
}
