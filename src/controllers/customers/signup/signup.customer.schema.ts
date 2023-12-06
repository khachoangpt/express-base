import z from 'zod'

export const SignUpSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, 'Name can not be empty'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, 'Email can not be empty')
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(1, 'Password can not be empty'),
})

export type SignUpParams = z.infer<typeof SignUpSchema>

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpParams:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
