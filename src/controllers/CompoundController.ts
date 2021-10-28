/* eslint-disable prettier/prettier */
import Compound from '@compound-finance/compound-js'
import {
  CTokenServiceRequest,
  GovernanceServiceRequest,
  AccountServiceRequest,
} from '@compound-finance/compound-js/dist/nodejs/types'
import { JsonController, Get, QueryParams } from 'routing-controllers'

@JsonController()
export class CompoundController {
  @Get('/compound/ctoken')
  async getCtokenList(@QueryParams() query: CTokenServiceRequest) {
    try {
      const response = await Compound.api.cToken(query)
      return response
    } catch (e: any) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  @Get('/compound/proposals')
  async getProposals(@QueryParams() query: GovernanceServiceRequest) {
    try {
      const response = await Compound.api.governance(query, 'proposals')
      return response
    } catch (e: any) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  @Get('/compound/accounts')
  async getAccounts(@QueryParams() query: AccountServiceRequest) {
    try {
      const response = await Compound.api.account(query)
      return response
    } catch (e: any) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }
}
