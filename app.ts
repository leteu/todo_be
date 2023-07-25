import express from 'express'
import http from 'http'
import cors from 'cors'

import { Client } from 'pg'
import { router } from 'router'

const port = 8080

const app = express()
const server = http.createServer(app)

export const dbClient = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'todo',
})

;(async () => {
  await dbClient.connect()

  app.use(cors())
  app.use(express.json())
  app.use('/', router)

  server.listen(port, () => {
    console.log(`
      Server listening on port: ${port}
    `);
  })
})()
