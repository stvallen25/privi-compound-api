import * as dotenv from 'dotenv'

dotenv.config()

export const BASIC_REQUEST_TOKEN = process.env.BASIC_REQUEST_TOKEN || 'SoMeR@nD0MsTrInG'
export const IS_TESTNET = process.env.API_ENV === 'testnet'
