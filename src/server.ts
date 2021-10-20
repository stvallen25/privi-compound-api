/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-case-declarations */
import fs from 'fs'
import http from 'http'
import https from 'https'

import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import logger from 'morgan'
import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'

import type { Env } from './config'
import { CompoundController } from './controllers/CompoundController'
import { BasicAuthMiddleware } from './middlewares/BasicAuthMiddleware'

export const startServer = (env: Env): https.Server | http.Server => {
  const port = process.env.PORT || 3013
  const app = express()
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
  })

  // Show API calls in console
  app.use(logger('dev'))

  // CORS policy
  // *** TODO: filter by priviweb.tech origin if Env='prod' ***
  app.use(
    cors({
      origin: env === 'devssl' ? 'https://api-dev.privi.compound' : '*',
    })
  )

  // Set HTTP headers for security
  app.use(helmet())

  app.use(apiLimiter)

  // Configure Express to parse incoming JSON data
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })

  useExpressServer(app, {
    middlewares: [BasicAuthMiddleware],
    controllers: [CompoundController],
  })

  switch (env) {
    // Run in local (development) environment with SSL
    case 'devssl':
      const devCredentials = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert'),
      }

      const devHttpsServer = https.createServer(devCredentials, app)

      devHttpsServer.listen(port, () => {
        console.log(`Back-end DEV (SSL) running on port ${port}`)
      })

      return devHttpsServer
    // Run in production environment with SSL
    case 'prod':
      const privateKey = fs.readFileSync('/etc/letsencrypt/live/priviweb.tech/privkey.pem', 'utf8')
      const certificate = fs.readFileSync('/etc/letsencrypt/live/priviweb.tech/cert.pem', 'utf8')
      const ca = fs.readFileSync('/etc/letsencrypt/live/priviweb.tech/chain.pem', 'utf8')

      const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
      }

      const httpsServer = https.createServer(credentials, app)

      httpsServer.listen(port, () => {
        console.log(`Back-end PROD (SSL) running on port ${port}`)
      })

      return httpsServer
    // Run in local (development) environment without SSL
    case 'dev':
    default:
      const httpServer = http.createServer(app)

      httpServer.listen(port, () => {
        console.log(`Back-end DEV (Non-SSL) running on port ${port}`)
      })

      return httpServer
  }
}
