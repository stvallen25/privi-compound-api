/* eslint-disable prettier/prettier */
import { JsonController, Get } from 'routing-controllers'

@JsonController()
export class CompoundController {
  @Get('/compound/ctoken')
  async getCtokenList() {
    return []
  }
}
