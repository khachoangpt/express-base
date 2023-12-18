import z from 'zod'

import { PERMISSION } from '@/constants'

export const CreateApikeySchema = z.object({
  permissions: z.array(
    z.enum([PERMISSION.ROLE_1, PERMISSION.ROLE_2, PERMISSION.ROLE_3]),
  ),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApikeyParams:
 *       type: object
 *       properties:
 *         permissions:
 *           type: string
 *           enum:
 *             - 0000
 *             - 1111
 *             - 2222
 */
export type CreateApikeyParams = z.infer<typeof CreateApikeySchema>
