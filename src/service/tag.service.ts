import { dbClient } from '@/app'

const selectTagService = (limit: number, page: number) => {
  return dbClient.query(
    `SELECT * FROM tag ORDER BY "tag_id" DESC LIMIT $1 OFFSET $2`,
    [limit, page * limit]
  )
}

const updateTagService = (desc: string, id: number) => {
  return dbClient.query(`UPDATE tag SET "desc" = $1 WHERE "tag_id" = $2`, [desc, id])
}

const insertTagService = (desc: string) => {
  return dbClient.query(`INSERT INTO tag ("desc") VALUES ($1)`, [desc])
}

const selectTagLikedTodosService = (id: number) => {
  return dbClient.query(
    `
      select
        td.todo_id as id,
        td."desc" as desc
      from
        todo td
      left join
        tag t
      on
        td.tag_id = t.tag_id
      where
        t.tag_id = $1
    `,
    [id]
  )
}

const deleteTageService = (id: number) => {
  return dbClient.query(`DELETE from tag WHERE "tag_id" = $1`, [id])
}

export {
  selectTagService,
  updateTagService,
  insertTagService,
  selectTagLikedTodosService,
  deleteTageService,
}
