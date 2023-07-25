import { Router } from 'express'

import { getNodeLink } from 'controller/node.controller'

const router = Router()

router.get('/link', getNodeLink)

export { router as nodeRouter }
