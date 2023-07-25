import { Router } from 'express'

import { getTodoList, getTodoArchiveList, saveTodo, archiveTodo } from 'controller/todo.controller'

const router = Router()

router.post('/list', getTodoList)
router.post('/archive', getTodoArchiveList)
router.post('/save', saveTodo)
router.delete('/delete/:id', archiveTodo)

export { router as todoRouter }
