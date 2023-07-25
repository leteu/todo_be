import { dbClient } from '@/app'

const getNodeLinkService = () => {
  return dbClient.query(
    `
      SELECT 
        t.tag_id AS "tagId", 
        t.desc AS "tagDesc", 
        json_agg(json_build_object('id', todo_id, 'desc', td.desc)) AS todos
      FROM
        tag t
      LEFT JOIN 
        todo td ON t.tag_id = td.tag_id
      WHERE
        td.del_dt IS NULL
      GROUP BY 
        t.tag_id, t.desc;
    `
  )
}

export {
  getNodeLinkService
}
