import { Request, Response } from 'express'
import { z } from 'zod'

export const validator = async <T>(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
  req: Request,
  res: Response,
): Promise<T | undefined> => {
  try {
    const parseData = (await schema.parseAsync(req.body)) as T
    return parseData
  } catch (error) {
    let err = error
    if (err instanceof z.ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }))
    }
    res.status(409).json({
      validationError: err,
    })
    return
  }
}
