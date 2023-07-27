import { Request, Response } from 'express'

import { selectTagService, updateTagService, insertTagService, deleteTageService, selectTagLikedTodosService } from 'service/tag.service'

const getTagList = async (req: Request, res: Response) => {
  const limit = req.body?.limit || 10
  const page = (req.body?.page - 1) || 0

  try {
    const result = await selectTagService(limit, page)

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

const saveTag = async (req: Request, res: Response) => {
  const id = req.body?.id || undefined
  const desc = req.body.desc

  try {
    if (!desc) throw new Error()

    if (id) {
      await updateTagService(desc, id)
      return res.sendStatus(200)
    } else {
      await insertTagService(desc)
      return res.sendStatus(200)
    }
  } catch (e) {
    return res.sendStatus(500)
  }
}

const deleteTag = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    if (!id) throw new Error()

    const tagLinkedTodos = await selectTagLikedTodosService(Number(id))

    if (tagLinkedTodos.rowCount) {
      return res.status(500).json({
        contents: tagLinkedTodos.rows,
        total: tagLinkedTodos.rowCount,
        message: `ERROR: tag id ${id} has todo`
      })
    }
  
    await deleteTageService(Number(id))
  
    return res.sendStatus(200)
  } catch (e) {
    return res.sendStatus(500)
  }
}

export {
  getTagList,
  saveTag,
  deleteTag,
}