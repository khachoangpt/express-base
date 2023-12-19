import z from 'zod'

export const RefreshTokenSchema = z.object({
  refreshToken: z
    .string({ required_error: 'Refresh token is required' })
    .trim()
    .min(1, 'Refresh token can not be empty'),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenParams:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 */
export type RefreshTokenParams = z.infer<typeof RefreshTokenSchema>
