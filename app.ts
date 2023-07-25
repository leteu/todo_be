import express from 'express'
import { Client } from 'pg'
import { router } from 'router'

const port = 8080

const app = express()
app.use(express.json())

export const dbClient = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'todo',
})

;(async () => {
  await dbClient.connect()

  app.use('/', router)

  app.listen(port, () => {
    console.log(`
      Server listening on port: ${port}
    `);
  })
})()
