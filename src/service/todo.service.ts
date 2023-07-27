import { dbClient } from '@/app'

const selectTodoService = (limit: number, page: number) => {
  return dbClient.query(
    `
      SELECT
        td.todo_id AS "id",
        td."desc" AS "desc",
        td.done AS "done",
        td.reg_dt AS "regDt",
        td.mod_dt AS "modDt",
        td.del_dt AS "delDt",
        jsonb_build_object('id', t.tag_id, 'desc', t.desc) AS tag
      FROM
        todo td
      INNER JOIN
        tag t ON td.tag_id = t.tag_id
      WHERE
        td.del_dt IS NULL
      GROUP BY 
        td.todo_id,
        t.tag_id
      ORDER by
        td.todo_id desc
      limit
        $1
      OFFSET
        $2
    `,
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
