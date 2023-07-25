import { dbClient } from '@/app'

const selectTodoService = (limit: number, page: number) => {
  return dbClient.query(
    `SELECT * FROM todo WHERE "del_dt" IS NULL ORDER BY "todo_id" DESC LIMIT $1 OFFSET $2`,
    [limit, page * limit]
  )
}

const selectTodoArchiveService = (limit: number, page: number) => {
  return dbClient.query(
    `SELECT * FROM todo WHERE "del_dt" IS NOT NULL ORDER BY "todo_id" DESC LIMIT $1 OFFSET $2`,
    [limit, page * limit]
  )
}

const updateTodoService = (id: number, desc: string, tagId: number, done: boolean) => {
  return dbClient.query(
    `
      UPDATE todo SET
        ${desc !== undefined ? `"desc" = $2,` : ''}
        ${tagId !== undefined ? `"tag_id" = $3,` : ''}
        ${done !== undefined ? `"done" = $4,` : ''}
        "mod_dt" = to_timestamp($5)
      WHERE "tag_id" = $1
    `,
    [id, desc, tagId, done, (Date.now() / 1000.0)]
  )
}

const insertTodoService = (desc: string, tagId: number) => {
  return dbClient.query(
    `
      INSERT INTO todo
        ("desc", "tag_id", "reg_dt")
      VALUES
        ($1, $2, to_timestamp($3))
    `,
    [desc, tagId, (Date.now() / 1000.0)]
  )
}

const archiveTodoService = (id: number) => {
  return dbClient.query(`UPDATE todo SET "del_dt" = to_timestamp($2) WHERE "todo_id" = $1`, [id, (Date.now() / 1000.0)])
}

export {
  selectTodoService,
  selectTodoArchiveService,
  updateTodoService,
  insertTodoService,
  archiveTodoService,
}
