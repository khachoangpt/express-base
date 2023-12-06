import { Request } from 'express'
import { z } from 'zod'

import { ConflictRequestError } from '@/core/error.response'

export const validator = async <T>(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
  req: Request,
): Promise<T> => {
  try {
    const parseData = (await schema.parseAsync(req.body)) as T
    return parseData
  } catch (error) {
    let err = error
    if (err instanceof z.ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }))
    }
    throw new ConflictRequestError(JSON.stringify(err))
  }
}
