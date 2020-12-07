import * as entitiesObject from '../lib/graphql/server/models'
import {
  createConnection,
  getConnectionManager,
  getConnectionOptions,
} from 'typeorm'

if (!getConnectionManager().has('default')) {
  const connectionOptions = await getConnectionOptions()

  //@ts-ignore
  await createConnection({
    ...connectionOptions,
    entities: Object.values(entitiesObject),
  })
}
