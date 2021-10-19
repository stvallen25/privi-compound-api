import { Middleware, ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers'

import { BASIC_REQUEST_TOKEN } from '../common/const'
import { getBasicTokenFromRequest } from '../services/auth'

@Middleware({ type: 'before' })
export class BasicAuthMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    const basicToken = getBasicTokenFromRequest(request)

    if (basicToken !== BASIC_REQUEST_TOKEN) {
      throw new UnauthorizedError('API key is invalid')
    }

    next()
  }
}
