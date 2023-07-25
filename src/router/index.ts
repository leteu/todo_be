import { Router } from 'express'
import { todoRouter } from './todoRouter'
import { tagRouter } from './tagRouter'
import { nodeRouter } from './nodeRouter'

const router = Router()

router.use('/tag', tagRouter)
router.use('/todo', todoRouter)
router.use('/node', nodeRouter)

export { router }
