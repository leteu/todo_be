import { Router } from 'express'

import { getTagList, saveTag, deleteTag } from 'controller/tag.controller'

const router = Router()

router.post('/list', getTagList)
router.post('/save', saveTag)
router.delete('/delete/:id', deleteTag)

export { router as tagRouter }
