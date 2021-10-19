import type { ClientOpts, RedisClient } from 'redis'
import { createClient } from 'redis'

import { CacheProvider } from './CacheProvider'

export class RedisCacheProvider implements CacheProvider {
  private redisClient: RedisClient

  constructor(private cachePrefix: string, options?: ClientOpts) {
    this.redisClient = createClient(options)
  }

  public async set(key: string, value: string, expirationInSeconds: number): Promise<void> {
    // https://redis.io/commands/setex
    return new Promise((resolve, reject) => {
      this.redisClient.SETEX(this.cachePrefix + key, expirationInSeconds, value, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  public async get(key: string): Promise<string | undefined> {
    // https://redis.io/commands/get
    return new Promise((resolve, reject) => {
      this.redisClient.GET(this.cachePrefix + key, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply || undefined)
        }
      })
    })
  }
}
