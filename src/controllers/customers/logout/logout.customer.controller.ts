import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import AccessService from '@/services/access/access.service'

/**
 * @swagger
 * /customer/logout:
 *   post:
 *     summary: Logout
 *     description: Customer logout
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Shop
 *     responses:
 *       200:
 *         description: A shop
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Success
 */
export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')
  await accessService.logout(req.token)
  res.status(statusCodes.OK).json('Logout Success')
}
