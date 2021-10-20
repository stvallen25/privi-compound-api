/* eslint-disable prettier/prettier */
import Compound from '@compound-finance/compound-js'
import { CTokenServiceRequest } from '@compound-finance/compound-js/dist/nodejs/types'
import { JsonController, Get, QueryParams } from 'routing-controllers'

@JsonController()
export class CompoundController {
  @Get('/compound/ctoken')
  async getCtokenList(@QueryParams() query: CTokenServiceRequest) {
    try {
      const response = Compound.api.cToken(query)
      return response
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
}
