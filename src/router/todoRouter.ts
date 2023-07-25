import { Router } from 'express'

import { getTodoList, getTodoArchiveList, saveTodo, archiveTodo } from 'controller/todo.controller'

const router = Router()

router.post('/todo/list', getTodoList)
router.post('/todo/archive', getTodoArchiveList)
router.post('/todo/save', saveTodo)
router.delete('/todo/delete/:id', archiveTodo)

export { router as todoRouter }
