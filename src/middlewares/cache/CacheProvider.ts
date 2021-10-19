export interface CacheProvider {
  set(key: string, value: string, expirationInSeconds: number): Promise<void>
  get(key: string): Promise<string | undefined>
}
