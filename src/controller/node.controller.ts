import { Request, Response } from 'express'

import { getNodeLinkService } from '../service/node.service'

const getNodeLink = async (req: Request, res: Response) => {
  try {
    const result = await getNodeLinkService()

    return res
      .status(200)
      .json({
        contents: result.rows,
        total: result.rowCount,
      })
  } catch (e) {
    return res.sendStatus(500)
  }
}

export {
  getNodeLink
}
