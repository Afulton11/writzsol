import { hello } from './hello-world'

test('Can import and run', () => {
  expect(hello).toEqual('Hello World')
})

test('Returns Correct Test Credentials', () => {
  const testDbUrl = process.env.TYPEORM_URL || 'NO ENV'
  const appEnv = process.env.APP_ENV || 'NO APP ENV FOUND'

  if (appEnv === 'TESTING SERVER' || appEnv === 'LOCAL TESTING') {
    expect(testDbUrl).toEndWith('writzsol_test')
  } else {
    throw new Error('TEST ENV FILE NOT SOURCED')
  }
})
