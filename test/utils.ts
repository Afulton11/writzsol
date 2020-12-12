import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import { User } from '../lib/graphql/server'

/** Resets a database to a blank state */
export const resetDB = async (): Promise<void> => {
  const connection = await getConnection()

  // we probably want this to be a truncate
  await connection.dropDatabase()
  await connection.synchronize()
}

/** Set up a connection to the database and reset it to a blank state */
export const connectDB = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions()

  await createConnection({
    ...connectionOptions,
    entities: [User],
    migrations: [__dirname + '/lib/graphql/server/migrations/*.ts'],
    synchronize: false,
    migrationsRun: false,
    logging: false,
  })

  await resetDB()
}

export const closeDB = async (): Promise<void> => {
  const connection = await getConnection()
  await connection.close()
}
