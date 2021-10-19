export const getBasicTokenFromRequest = (request: any) => {
  const authorizationHeader = request.headers['authorization'] || ''
  return authorizationHeader.replace('Basic ', '')
}
