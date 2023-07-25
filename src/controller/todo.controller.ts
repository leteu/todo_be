import { Request, Response } from 'express'

import { selectTodoService, selectTodoArchiveService, updateTodoService, insertTodoService, archiveTodoService } from 'service/todo.service'


const getTodoList = async (req: Request, res: Response) => {
  const limit = req.body?.limit || 10
  const page = (req.body?.page - 1) || 0

  try {
    const result = await selectTodoService(limit, page) 

    return res
      .status(200)
      .json({
        contents: result.rows,
        total: result.rowCount,
        page: page + 1,
        limit,
      })
  } catch (e) {
    return res.sendStatus(500)
  }
}

const getTodoArchiveList = async (req: Request, res: Response) => {
  const limit = req.body?.limit || 10
  const page = (req.body?.page - 1) || 0

  try {
    const result = await selectTodoArchiveService(limit, page) 

    return res
      .status(200)
      .json({
        contents: result.rows,
        total: result.rowCount,
        page: page + 1,
        limit,
      })
  } catch (e) {
    return res.sendStatus(500)
  }
}

const saveTodo = async (req: Request, res: Response) => {
  const id = req.body?.id || undefined
  const desc = req.body.desc
  const tagId = req.body.tag
  const done = req.body.done

  try {
    if (id) {
      await updateTodoService(id, desc, tagId, done) 
      return res.sendStatus(200)
    } else {
      await insertTodoService(desc, tagId)
      return res.sendStatus(200)
    }
  } catch (e) {
    return res.sendStatus(500)
  }
}

const archiveTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    if (!id) throw new Error()
  
    await archiveTodoService(Number(id)) 
  
    return res.sendStatus(200)
  } catch (e) {
    return res.sendStatus(500)
  }
}

export {
  getTodoList,
  getTodoArchiveList,
  saveTodo,
  archiveTodo,
}