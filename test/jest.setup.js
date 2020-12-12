const path = require('path')
const dotenv = require('dotenv')
require('jest-extended')

jest.setTimeout(30000)

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })
