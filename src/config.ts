import * as dotenv from 'dotenv'

export type Env = 'dev' | 'devssl' | 'prod'

dotenv.config()

export const env: Env = process.argv[2] as Env

if (!['dev', 'devssl', 'prod'].includes(env)) {
  console.error(
    `Please use any of the following commands:

$ nodemon dev => for Development (without SSL)
$ nodemon devssl (with SSL)=> for Development
$ nodemon prod => for Production
`
  )

  process.exit(1)
}
